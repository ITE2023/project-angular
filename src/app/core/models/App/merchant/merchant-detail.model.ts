export class MerchantBasicInfo {
  public merchantId?: number;
  public merchantCode?: string;
  public merchantFullName?: string;
  public merchantShortName?: string;
  public merchantManageDept?: any;
  public merchantManageDeptName?: string;
  public merchantPresenter?: string;
  public merchantPresenterIdNo?: string;
  public phone?: string;
  public email?: string;
  public companyType?: any;
  public companyTypeName?: string;
  public businessType?: any;
  public businessTypeName?: string;
  public businessRegNo?: string;
  public address?: string;
  public cityId?: any;
  public cityName?: string;
  public districtId?: any;
  public districtName?: string;
  public communeId?: any;
  public communeName?: string;
  public website?: string;
  public status?: string;
  public statusKey?: string;
  public createDate?: string;
}
export class MerchantAdditionalInfo {
  public inChargeStaffCode?: string;
  public agencyInChargeCode?: string;
  public agencyInChargeName?: string;
  public officeImageUrl?: string[];
  public idCardFrontImageUrl?: string;
  public idCardBackImageUrl?: string;
  public businessRegNoImageUrl?: string;
}
export class MerchantContractInfo {
  public merchantContractUrls?: string[];
  public merchantContractName?: string[];
  public signOnDate?: string;
  public expiredDate?: string;
  public status?: string;
  public statusName?: string;
  public serviceStatus?: any;
  public serviceStatusName?: string;
}
export class PaymentMethod {
  public paymentMethod?: number;
  public paymentMethodName?: string;
  public check?: boolean;
  public sustainFee?: number;
  public currency?: string;
  public executeFeeConst?: number;
  public executeFeePercent?: number;
  public paymentFeeConst?: number;
  public paymentFeePercent?: number;
  public refundFeeConst?: number;
  public refundFeePercent?: number;
}
export class MerchantAccountInfo {
  public accountingMethod?: number;
  public accountingMethodName?: string;
  public accountingName?: string;
  public accountHoldName?: string;
  public beneficiariesAccount?: string;
  public beneficiariesAccountBank?: number;
  public beneficiariesAccountBankName?: string;
}
export class QRCodeInfo {
  public qrCodeId?: number;
  public qrCodeName?: string;
  public qrCodeTypeId?: number;
  public qrCodeTypeName?: string;
  public qrCodeLink?: string;
  public detail?: string;
  public price?: number;
  public currency?: string;
  public dateCreated?: string;
  public status?: string;
}
