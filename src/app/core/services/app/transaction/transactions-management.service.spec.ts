import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import {
  TranslateModule,
  TranslateFakeLoader,
  TranslateService,
  TranslateLoader,
} from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import {
  MockTranslateService,
  MockTranslateLoader,
} from "src/app/shared/mockData/mockCommon";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogMock } from "src/app/shared/mockData/mockDialog";
import { of } from "rxjs";

import { AUTH_API_URL } from "@core/constants";
import {
  MockPaymenMethod,
  MockBank,
  MockTrans,
} from "src/app/shared/mockData/mockCommonService";
import { MockServiceStatus } from "src/app/web/merchant-management/merchant-edit-dialogs/merchant-contract-info-edit/merchant-contract-info-edit.component.spec";
import { DashboardService, TransactionManager } from "@core/services";

describe("Transaction Service", () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        // RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateModule,
            useClass: TranslateFakeLoader,
            deps: [HttpClient],
          },
        }),
        // MaterialModule,
        // ToastrModule.forRoot(),
        // BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: TranslateLoader,
          useClass: MockTranslateLoader,
        },
        {
          provide: TranslateService,
          useClass: MockTranslateService,
        },
        {
          provide: MatDialog,
          useClass: MatDialogMock,
        },
        TransactionManager,
        // HttpTestingController
      ],
    });
  });

  it("should get payment list for dashboard", () => {
    let service = TestBed.get(DashboardService);
    service.baseUrl = AUTH_API_URL + '/';
    let httpMock = TestBed.get(HttpTestingController);
    const req = { page: 1, size: 10 };
    const result = service.getNewestTransaction(req).subscribe((res: any) => {
      expect(res).toEqual({
        error_code: "00",
        total_record: 10,
        list_data: MockTrans,
      });
    });
    httpMock.expectOne(`${AUTH_API_URL}/dashboard/transaction/new`).flush({
      error_code: "00",
      total_record: 10,
      list_data: MockTrans,
    });
    httpMock.verify();
    expect(service).toBeTruthy();
  });
  it("should get payment transaction", () => {
    let service = TestBed.get(TransactionManager);
    service.baseUrl = AUTH_API_URL + '/';
    let httpMock = TestBed.get(HttpTestingController);
    const req = { page: 1, size: 10 };
    const result = service.getTransactionPayment(req).subscribe((res: any) => {
      expect(res).toEqual({
        error_code: "00",
        total_record: 10,
        list_data: MockTrans,
      });
    });
    httpMock.expectOne(`${AUTH_API_URL}/transaction/search`).flush({
      error_code: "00",
      total_record: 10,
      list_data: MockTrans,
    });
    httpMock.verify();
    expect(service).toBeTruthy();
  });
  it("should get payment transaction detail", () => {
    let service = TestBed.get(TransactionManager);
    service.baseUrl = AUTH_API_URL + '/';
    let httpMock = TestBed.get(HttpTestingController);
    const req = { transaction_id: "100842" };
    const result = service
      .getDetailTransactionPayment(req)
      .subscribe((res: any) => {
        expect(res).toEqual({
          error_code: "00",
          data: MockTrans[0],
        });
      });
    httpMock.expectOne(`${AUTH_API_URL}/transaction/detail`).flush({
      error_code: "00",
      data: MockTrans[0],
    });
    httpMock.verify();
    expect(service).toBeTruthy();
  });
  it("should get refund transaction list", () => {
    let service = TestBed.get(TransactionManager);
    service.baseUrl = AUTH_API_URL + '/';
    let httpMock = TestBed.get(HttpTestingController);
    const req = { transaction_id: "100842" };
    const result = service.getTransactionRefund(req).subscribe((res: any) => {
      expect(res).toEqual({
        error_code: "00",
        list_data: MockTrans,
      });
    });
    httpMock
      .expectOne(`${AUTH_API_URL}/refund/search`)
      .flush({
        error_code: "00",
        list_data: MockTrans,
      });
    httpMock.verify();
    expect(service).toBeTruthy();
  });
  it("should get refund transaction detail", () => {
    let service = TestBed.get(TransactionManager);
    service.baseUrl = AUTH_API_URL + '/';
    let httpMock = TestBed.get(HttpTestingController);
    const req = { transaction_id: "100842" };
    const result = service
      .getDetailTransactionRefund(req)
      .subscribe((res: any) => {
        expect(res).toEqual({
          error_code: "00",
          list_data: MockTrans,
        });
      });
    httpMock
      .expectOne(`${AUTH_API_URL}/refund/detail`)
      .flush({
        error_code: "00",
        list_data: MockTrans,
      });
    httpMock.verify();
    expect(service).toBeTruthy();
  });
});
