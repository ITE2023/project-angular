import { TestBed, async } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
  TranslateService,
} from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialog } from "@angular/material/dialog";
import {
  MockTranslateService,
  MockRouter,
  MockActivatedRouteValue,
} from "src/app/shared/mockData/mockCommon";
import {
  CommonService,
  MerchantService,
  AuthenticationAndAuthorizationService,
  TransactionManager,
} from "@core/services";
import { FormBuilder } from "@angular/forms";
import { MockAgency, MockCommonService } from "src/app/shared/mockData/mockCommonService";
import { of } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogMock } from "src/app/shared/mockData/mockDialog";
import { MaterialModule } from "src/app/shared/shared/material.module";
import { PaginationComponent } from "@core/components/pagination/pagination.component";
import { CommonConstants } from "@core/constants";
import { MockAuthService } from "src/app/shared/mockData/mockAuthService";
import { TransactionPaymentComponent } from "./transaction-payment.component";
import { DecimalPipe } from "@angular/common";
import { MockTransactionStatus, MockTransactionPaymentMethod, MockIssuerTransaction, MockTransactionChannel, MockTransactionPaymentList, MockMasterMerchants, MockSubMerchants } from "src/app/shared/mockData/mockTransactionService";
import * as moment from "moment";

const maxDate = new Date();
const y = maxDate.getFullYear();
const m = maxDate.getMonth();
const from = moment(new Date(y, m, 1)).format('DD/MM/YYYY');
const to = moment(new Date()).format('DD/MM/YYYY');

describe("TransactionPaymentComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
            deps: [HttpClient],
          },
        }),
        MaterialModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
      ],
      declarations: [TransactionPaymentComponent, PaginationComponent],
      providers: [
        {
          provide: CommonService,
          useClass: MockCommonService,
        },
        FormBuilder,
        ToastrService,
        {
          provide: ActivatedRoute,
          useValue: MockActivatedRouteValue(
            undefined,
            of<any>({
              page: 1,
              size: 10,
            })
          ),
        },
        {
          provide: AuthenticationAndAuthorizationService,
          useClass: MockAuthService,
        },
        {
          provide: Router,
          useClass: MockRouter,
        },
        CommonService,
        {
          provide: TranslateService,
          useClass: MockTranslateService,
        },
        {
          provide: MatDialog,
          useClass: MatDialogMock,
        },
        TransactionManager,
        MerchantService,
        DecimalPipe
      ],
    }).compileComponents();
  }));
  it("should create the app with mock Transaction Payment List displayed", () => {
    const fixture = TestBed.createComponent(TransactionPaymentComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.commonService, "GetListBoxData")
      .withArgs("master_merchants")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockMasterMerchants,
        })
      )
      .withArgs("transaction_status")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockTransactionStatus,
        })
      )
      .withArgs("transaction_payment_method")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockTransactionPaymentMethod,
        })
      )
      .withArgs("agency")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockAgency,
        })
      )
      .withArgs("issuer_transaction")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockIssuerTransaction,
        })
      )
      .withArgs("transaction_channel")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockTransactionChannel,
        })
      )
    spyOn(app, "onValueChange").and.callThrough();
    spyOn(app.merchantService, "getSubMerchantList").and.returnValue(
      of({
        error_code: "00",
        list_data: MockSubMerchants,
        total_record: 2,
      })
    );
    spyOn(app, "searchData").and.callThrough();
    spyOn(app.transactionService, "getTransactionPayment").and.returnValue(
      of({
        error_code: "00",
        list_data: MockTransactionPaymentList,
        total_record: 7,
      })
    );
    app.subMerchantList = [];
    app.ngOnInit();
    app.merchantFilterCtrl.setValue('a');
    app.changeMerchant({ value: 100730 });
    app.agencyFilterCtrl.setValue('a');
    app.issuerFilterCtrl.setValue('a');
    app.f.merchant_id.enable();
    app.subMerchantFilterCtrl.setValue('a');
    expect(app.searchData).toHaveBeenCalled();
    expect(app.f).toBeTruthy();
    expect(app).toBeTruthy();
  });

  it("getTransactionPayment failed", () => {
    const fixture = TestBed.createComponent(TransactionPaymentComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.commonService, "GetListBoxData")
      .withArgs("master_merchants")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockMasterMerchants,
        })
      )
      .withArgs("transaction_status")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockTransactionStatus,
        })
      )
      .withArgs("transaction_payment_method")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockTransactionPaymentMethod,
        })
      )
      .withArgs("agency")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockAgency,
        })
      )
      .withArgs("issuer_transaction")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockIssuerTransaction,
        })
      )
      .withArgs("transaction_channel")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockTransactionChannel,
        })
      )
    spyOn(app, "onValueChange").and.callThrough();
    spyOn(app.merchantService, "getSubMerchantList").and.returnValue(
      of({
        error_code: "01"
      })
    );
    spyOn(app, "searchData").and.callThrough();
    spyOn(app.transactionService, "getTransactionPayment").and.returnValue(
      of({
        error_code: "01"
      })
    );
    app.subMerchantList = [];
    app.ngOnInit();
    app.merchantFilterCtrl.setValue('a');
    app.changeMerchant({ value: 0 });
    app.agencyFilterCtrl.setValue('a');
    app.issuerFilterCtrl.setValue('a');
    expect(app.searchData).toHaveBeenCalled();
    expect(app.f).toBeTruthy();
    expect(app).toBeTruthy();
  });

  it("should change page when change page", () => {
    const fixture = TestBed.createComponent(TransactionPaymentComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.commonService, "GetListBoxData")
      .withArgs("master_merchants")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockMasterMerchants,
        })
      )
      .withArgs("transaction_status")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockTransactionStatus,
        })
      )
      .withArgs("transaction_payment_method")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockTransactionPaymentMethod,
        })
      )
      .withArgs("agency")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockAgency,
        })
      )
      .withArgs("issuer_transaction")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockIssuerTransaction,
        })
      )
      .withArgs("transaction_channel")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockTransactionChannel,
        })
      )
    const total = 7;
    spyOn(app, "onValueChange").and.callThrough();
    spyOn(app, "searchData").and.callThrough();
    spyOn(app.transactionService, "getTransactionPayment").and.returnValue(
      of({
        error_code: "00",
        list_data: MockTransactionPaymentList,
        total_record: total,
      })
    );
    spyOn(app.router, "navigate").and.callThrough();
    spyOn(app, "getPaymentList").and.callThrough();
    app.subMerchantList = [];
    app.ngOnInit();
    const newPage = 3;
    const searchRequest = {
      page: 3,
      size: 10,
      from_date: from,
      to_date: to,
    };
    app.changePage(newPage);
    expect(app.searchRequest).toEqual(searchRequest);
    expect(app.page).toEqual(newPage);
    expect(app.router.navigate).toHaveBeenCalledWith([app.url], {
      queryParams: searchRequest,
    });
    expect(app.getPaymentList).toHaveBeenCalledWith(searchRequest);
  });
  it("should change pageSize when change pageSize", () => {
    const fixture = TestBed.createComponent(TransactionPaymentComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.commonService, "GetListBoxData")
      .withArgs("master_merchants")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockMasterMerchants,
        })
      )
      .withArgs("transaction_status")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockTransactionStatus,
        })
      )
      .withArgs("transaction_payment_method")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockTransactionPaymentMethod,
        })
      )
      .withArgs("agency")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockAgency,
        })
      )
      .withArgs("issuer_transaction")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockIssuerTransaction,
        })
      )
      .withArgs("transaction_channel")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockTransactionChannel,
        })
      )
    const total = 7;
    spyOn(app, "onValueChange").and.callThrough();
    spyOn(app, "searchData").and.callThrough();
    spyOn(app.transactionService, "getTransactionPayment").and.returnValue(
      of({
        error_code: "00",
        list_data: MockTransactionPaymentList,
        total_record: total,
      })
    );
    spyOn(app.router, "navigate").and.callThrough();
    spyOn(app, "getPaymentList").and.callThrough();
    app.subMerchantList = [];
    app.ngOnInit();
    const newPageSize = 25;
    const searchRequest = {
      page: 1,
      size: 25,
      from_date: from,
      to_date: to,
    };
    app.onPageSizeChange(newPageSize);
    expect(app.searchRequest).toEqual(searchRequest);
    expect(app.pageSize).toEqual(newPageSize);
    expect(app.page).toEqual(1);
    expect(app.router.navigate).toHaveBeenCalledWith([app.url], {
      queryParams: searchRequest,
    });
    expect(app.getPaymentList).toHaveBeenCalledWith(searchRequest);
  });

  it("should call search data with input search", () => {
    const fixture = TestBed.createComponent(TransactionPaymentComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.commonService, "GetListBoxData")
      .withArgs("master_merchants")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockMasterMerchants,
        })
      )
      .withArgs("transaction_status")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockTransactionStatus,
        })
      )
      .withArgs("transaction_payment_method")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockTransactionPaymentMethod,
        })
      )
      .withArgs("agency")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockAgency,
        })
      )
      .withArgs("issuer_transaction")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockIssuerTransaction,
        })
      )
      .withArgs("transaction_channel")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockTransactionChannel,
        })
      )
    const total = 7;
    spyOn(app, "onValueChange").and.callThrough();
    spyOn(app, "searchData").and.callThrough();
    spyOn(app.transactionService, "getTransactionPayment").and.returnValue(
      of({
        error_code: "00",
        list_data: MockTransactionPaymentList,
        total_record: total,
      })
    );
    spyOn(app.router, "navigate").and.callThrough();
    spyOn(app, "getPaymentList").and.callThrough();
    app.subMerchantList = [];
    app.ngOnInit();
    const searchRequest = {
      page: 1,
      size: 10,
      from_date: from,
      to_date: to,
      transaction_id: '1',
      order_ref: '1',
      card_number: '1',
      payment_method: '1',
      transaction_channel: '1',
      status: '1',
      master_id: '1',
      agency_id: '1',
      issuer_code: '1',
    };
    app.f.from_date.setValue(new Date(app.convertDate(searchRequest.from_date)));
    app.f.to_date.setValue(new Date(app.convertDate(searchRequest.to_date)));
    app.f.transaction_id.setValue(searchRequest.transaction_id);
    app.f.order_ref.setValue(searchRequest.order_ref);
    app.f.card_number.setValue(searchRequest.card_number);
    app.f.payment_method.setValue(searchRequest.payment_method);
    app.f.transaction_channel.setValue(searchRequest.transaction_channel);
    app.f.status.setValue(searchRequest.status);
    app.f.master_id.setValue(searchRequest.master_id);
    app.f.agency_id.setValue(searchRequest.agency_id);
    app.f.issuer_code.setValue(searchRequest.issuer_code);
    app.searchData();
    expect(app.searchRequest).toEqual(searchRequest);
    expect(app.page).toEqual(1);
    expect(app.router.navigate).toHaveBeenCalledWith([app.url], {
      queryParams: searchRequest,
    });
    expect(app.getPaymentList).toHaveBeenCalledWith(searchRequest);
  });

  it("should apply parameter", () => {
    const fixture = TestBed.createComponent(TransactionPaymentComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.commonService, "GetListBoxData")
      .withArgs("master_merchants")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockMasterMerchants,
        })
      )
      .withArgs("transaction_status")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockTransactionStatus,
        })
      )
      .withArgs("transaction_payment_method")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockTransactionPaymentMethod,
        })
      )
      .withArgs("agency")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockAgency,
        })
      )
      .withArgs("issuer_transaction")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockIssuerTransaction,
        })
      )
      .withArgs("transaction_channel")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockTransactionChannel,
        })
      )
    const total = 7;
    spyOn(app, "onValueChange").and.callThrough();
    spyOn(app, "searchData").and.callThrough();
    spyOn(app.transactionService, "getTransactionPayment").and.returnValue(
      of({
        error_code: "00",
        list_data: MockTransactionPaymentList,
        total_record: total,
      })
    );
    spyOn(app.router, "navigate").and.callThrough();
    spyOn(app, "getPaymentList").and.callThrough();
    app.subMerchantList = [];
    app.ngOnInit();
    const param = {
      page: 1,
      size: 10,
      from_date: from,
      to_date: to,
      transaction_id: '1',
      order_ref: '1',
      card_number: '1',
      payment_method: '1',
      transaction_channel: '1',
      status: '1',
      master_id: '1',
      agency_id: '1',
      issuer_code: '1',
    };
    app.setDataFromParams(param);
    expect(app.searchRequest).toEqual({
      page: 1,
      size: 10,
      from_date: from,
      to_date: to,
      transaction_id: '1',
      order_ref: '1',
      card_number: '1',
      payment_method: '1',
      transaction_channel: '1',
      status: '1',
      master_id: '1',
      agency_id: '1',
      issuer_code: '1',
    });
    expect(app.page).toEqual(CommonConstants.DEFAULT_PAGE_INDEX);
    expect(app.pageSize).toEqual(CommonConstants.DEFAULT_PAGE_SIZE);
  });

  it("view detail", () => {
    const fixture = TestBed.createComponent(TransactionPaymentComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.commonService, "GetListBoxData")
      .withArgs("master_merchants")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockMasterMerchants,
        })
      )
      .withArgs("transaction_status")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockTransactionStatus,
        })
      )
      .withArgs("transaction_payment_method")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockTransactionPaymentMethod,
        })
      )
      .withArgs("agency")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockAgency,
        })
      )
      .withArgs("issuer_transaction")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockIssuerTransaction,
        })
      )
      .withArgs("transaction_channel")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockTransactionChannel,
        })
      )
    const total = 7;
    spyOn(app, "onValueChange").and.callThrough();
    spyOn(app, "searchData").and.callThrough();
    spyOn(app.transactionService, "getTransactionPayment").and.returnValue(
      of({
        error_code: "00",
        list_data: MockTransactionPaymentList,
        total_record: total,
      })
    );
    spyOn(app.router, "navigate").and.callThrough();
    spyOn(app, "getPaymentList").and.callThrough();
    app.ngOnInit();
    app.viewDetail(MockTransactionPaymentList[0]);
    expect(app).toBeTruthy();
  });

  it("should export excel file", () => {
    const fixture = TestBed.createComponent(TransactionPaymentComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.commonService, "GetListBoxData")
      .withArgs("master_merchants")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockMasterMerchants,
        })
      )
      .withArgs("transaction_status")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockTransactionStatus,
        })
      )
      .withArgs("transaction_payment_method")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockTransactionPaymentMethod,
        })
      )
      .withArgs("agency")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockAgency,
        })
      )
      .withArgs("issuer_transaction")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockIssuerTransaction,
        })
      )
      .withArgs("transaction_channel")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: MockTransactionChannel,
        })
      )
    const total = 7;
    spyOn(app, "onValueChange").and.callThrough();
    spyOn(app, "searchData").and.callThrough();
    spyOn(app.transactionService, "getTransactionPayment").and.returnValue(
      of({
        error_code: "00",
        list_data: MockTransactionPaymentList,
        total_record: total,
      })
    );
    spyOn(app.router, "navigate").and.callThrough();
    spyOn(app, "getPaymentList").and.callThrough();
    app.ngOnInit();
    app.fromDateChange(new Date(2020, 7, 20));
    app.toDateChange(new Date(2020, 8, 12));
    const event1 = {
      keyCode: 8
    }
    const event2 = {
      keyCode: 191
    }
    const event3 = {
      keyCode: 49
    }
    const event4 = {
      keyCode: 12
    }
    const event5 = {
      keyCode: 73
    }
    const result1 = app.keyPressDate(event1);
    const result2 = app.keyPressDate(event2);
    const result3 = app.keyPressDate(event3);
    const result4 = app.keyPressDate(event4);
    const result5 = app.keyPressDate(event5);
    expect(result1).toEqual(true);
    expect(result2).toEqual(true);
    expect(result3).toEqual(true);
    expect(result4).toEqual(false);
    expect(result5).toEqual(false);
    const event = {
      target: {
          value: 'Invalid date'
      }
    }
    app.isInvalidDate(event, 'to_date');
    expect(app.f['to_date'].value).toEqual(null);
    app.exportToExcel();
    expect(app).toBeTruthy();
  });
});
