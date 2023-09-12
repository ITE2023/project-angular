import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PaymentMethod, MerchantBasicInfo } from "@core/models";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BrowserAndLocationInformationService } from "@core/services/browser-and-location-information.service";
import { ConfigService } from "@core/services/configuration/configuration.service";

@Injectable({
  providedIn: "root",
})
export class MerchantService {
  private baseUrl;
  constructor(private http: HttpClient, public config: ConfigService) {
    this.baseUrl =
      this.config &&
      this.config.config &&
      this.config.config.API_ENDPOINTS &&
      this.config.config.API_ENDPOINTS.AUTH_API_URL
        ? this.config.config.API_ENDPOINTS.AUTH_API_URL
        : '';
  }
  public simpleClone(obj: any) {
    return Object.assign({}, obj);
  }
  public getFileNameFromUrl(url: string) {
    return url && url !== "" ? url.substring(url.lastIndexOf("/") + 1) : "";
  }

  UpdatePaymentInfo(body: any) {
    return this.http
      .post(`${this.baseUrl}/merchant/edit-payment-info`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
  UpdateBasicInfo(merchantid: number, merchant: MerchantBasicInfo) {
    let merchantInst: any = {
      merchant_id: merchantid,
      master_id: merchant.merchantManageDeptName,
      agent_phone: merchant.phone,
      agent_email: merchant.email,
      agent_identity: merchant.merchantPresenterIdNo,
      agent_name: merchant.merchantPresenter,
      company_type: merchant.companyType,
      business_type: merchant.businessType,
      tax_code: merchant.businessRegNo,
      address: merchant.address,
      province_id: merchant.cityId,
      commune_id: merchant.communeId,
      district_id: merchant.districtId,
    };

    if (merchant.website && merchant.website !== "") {
      merchantInst.website = merchant.website;
    }
    const body = {
      merchant: merchantInst,
    };
    return this.http
      .post(`${this.baseUrl}/merchant/edit-basic-info`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  public getMerchantLists(request): Observable<any> {
    return this.http.post(`${this.baseUrl}/merchant/search`, request);
  }
  public approveOrRejectMerchant(request): Observable<any> {
    return this.http.post(`${this.baseUrl}/merchant/approve`, request);
  }
  public activeOrDeactiveMerchant(request): Observable<any> {
    return this.http.post(`${this.baseUrl}/merchant/active`, request);
  }
  public getMerchantDetailStaffLists(request): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/common/staff-marketing-search`,
      request
    );
  }

  public getMerchantDetail(request): Observable<any> {
    return this.http.post(`${this.baseUrl}/merchant/detail`, request);
  }

  public updateAdditionalInfo(
    merchantId: number,
    resellerCode: string,
    staffCode: string,
    imageShop: File[],
    idFront: File,
    idBack: File,
    certificate: File
  ): Observable<any> {
    let formData = new FormData();
    formData.append("identity_image_front", idFront);
    imageShop.forEach((data) => {
      formData.append("shop_image", data);
    });
    formData.append("identity_image_behind", idBack);
    formData.append("bsn_cerfiticate", certificate);
    const info = BrowserAndLocationInformationService.getInfo();
    if (!info.ip_address || info.ip_address === "undefined") {
      info.ip_address = "118.70.124.48";
    }
    let merchant: any;
    if (resellerCode) {
      merchant = {
        merchant_id: merchantId,
        additional_infomation: {
          agency_id: resellerCode,
        },
      };
    } else {
      merchant = {
        merchant_id: merchantId,
        additional_infomation: {
          staff_code: staffCode,
        },
      };
    }
    info.merchant = merchant;
    const reqb = JSON.stringify(info);
    formData.append("req", reqb);
    return this.http.post(
      `${this.baseUrl}/merchant/edit-additional-info`,
      formData
    );
  }
  public updatePaymentMethods(
    merchantId: any,
    paymentMethods: PaymentMethod[]
  ): Observable<any> {
    let payment_method = [];
    paymentMethods.forEach((data) => {
      payment_method.push({
        method_id: data.paymentMethod,
        activated: 1,
      });
    });
    const body = {
      merchant: {
        merchant_id: merchantId,
        payment_method,
      },
    };
    return this.http.post(
      `${this.baseUrl}/merchant/edit-payment-method`,
      body
    );
  }

  updateContractInfo(files, browserInfo: any): Observable<any> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("contract_image", file.file, file.name);
    });
    formData.append("req", JSON.stringify(browserInfo));
    return this.http
      .post(`${this.baseUrl}/merchant/edit-contract`, formData)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  public checkStaffCode(staffCode: string) {
    const body = {
      staff_code: staffCode,
    };
    return this.http.post(
      `${this.baseUrl}/common/staff-marketing-check`,
      body
    );
  }
  public addNewMerchant(
    merchantInfo: any,
    officeImage: File[],
    idFront: File,
    idBack: File,
    certificate: File
  ): Observable<any> {
    let formData = new FormData();
    formData.append("identity_image_front", idFront);
    officeImage.forEach((data) => {
      formData.append("shop_image", data);
    });
    formData.append("identity_image_behind", idBack);
    formData.append("bsn_cerfiticate", certificate);
    const info = BrowserAndLocationInformationService.getInfo();
    if (!info.ip_address || info.ip_address === "undefined") {
      info.ip_address = "118.70.124.48";
    }
    info.merchant = merchantInfo;
    const reqb = JSON.stringify(info);
    formData.append("req", reqb);
    return this.http.post(`${this.baseUrl}/merchant/addnew`, formData);
  }
  public checkMerchantEmail(email: string) {
    const body = {
      agent_email: email,
    };
    return this.http.post(`${this.baseUrl}/merchant/check-email`, body);
  }
  public checkMerchantPhone(phone: string) {
    const body = {
      agent_phone: phone,
    };
    return this.http.post(`${this.baseUrl}/merchant/check-phone`, body);
  }
  public getSubMerchantList(parentId: string): Observable<any> {
    const body = {
      merchant_id: parentId,
    };
    return this.http.post(`${this.baseUrl}/merchant/sub/search`, body);
  }
  public getSubMerchantDetail(subMerchantId: string): Observable<any> {
    const body = {
      merchant_id: subMerchantId,
    };
    return this.http.post(`${this.baseUrl}/merchant/sub/detail`, body);
  }
  public getQRCodeList(
    merchantId: any,
    page: number,
    pageSize: number,
    sort: string
  ): Observable<any> {
    const body: any = {
      merchant_id: merchantId,
      page,
      size: pageSize,
    };
    if (sort && sort !== "") {
      body.sort_type = sort;
    }
    return this.http.post(`${this.baseUrl}/merchant/qr/list`, body);
  }

  // sandbox merchant
  public getSandboxMerchants(request): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/sandbox/merchant/search`, request)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  public getSandboxMerchantDetail(request): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/sandbox/merchant/detail`, request)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  public approveSandboxMerchant(request): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/sandbox/merchant/approve`, request)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // fee: merchant - agency - issuer
  public getFeeList(request, reference): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/${reference}/get-list-fee`, request)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  public getFeeDetail(request, reference): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/${reference}/detail-fee`, request)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  public addFee(request, reference): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/${reference}/add-fee`, request)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  public editFee(request, reference): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/${reference}/edit-fee`, request)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  public approveFee(request, reference): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/${reference}/approve-fee`, request)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  public getPriorityFee(request): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/fee/priority/search-merchant`, request)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // edit payment method
  public editPaymentMethods(request: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/merchant/edit-payment-method`, request)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // currency list
  public getCurrencyList(request: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/transaction_limit/search`, request)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // edit transaction limit
  public editTransactionLimit(request: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/merchant/edit-trans-limit`, request)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
}
