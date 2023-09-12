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
  MockUnit,
} from "src/app/shared/mockData/mockCommonService";
import { MockServiceStatus } from "src/app/web/merchant-management/merchant-edit-dialogs/merchant-contract-info-edit/merchant-contract-info-edit.component.spec";
import { UnitManagementService } from "./unit-management.service";
import { CommonService } from "../common/common.service";

describe("UnitManagement Service", () => {
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
        UnitManagementService,
        CommonService
        // HttpTestingController
      ],
    });
  });

  it("should get unit list", () => {
    let service = TestBed.get(UnitManagementService);
    service.baseUrl = AUTH_API_URL + '/';
    let httpMock = TestBed.get(HttpTestingController);
    const req = { page: 1, size: 10 };
    const result = service.getUnit(req).subscribe((res: any) => {
      expect(res).toEqual({
        error_code: "00",
        total_record: 10,
        list_data: MockUnit,
      });
    });
    httpMock.expectOne(`${AUTH_API_URL}/centre/search`).flush({
      error_code: "00",
      total_record: 10,
      list_data: MockUnit,
    });
    httpMock.verify();
    expect(service).toBeTruthy();
  });
  it("should get unit detail", () => {
    let service = TestBed.get(UnitManagementService);
    service.baseUrl = AUTH_API_URL + '/';
    let httpMock = TestBed.get(HttpTestingController);
    const req = { centre_id: "id001" };
    const result = service.getUnitById(req).subscribe((res: any) => {
      expect(res).toEqual({
        error_code: "00",
        data: MockUnit[0],
      });
    });
    httpMock.expectOne(`${AUTH_API_URL}/centre/detail`).flush({
      error_code: "00",
      data: MockUnit[0],
    });
    httpMock.verify();
    expect(service).toBeTruthy();
  });
  it("should update or add new ", () => {
    let service = TestBed.get(UnitManagementService);
    service.baseUrl = AUTH_API_URL + '/';
    let httpMock = TestBed.get(HttpTestingController);
    const reqAddNew = {
      centre_name: "centre001",
      email: "sample@gmail.com",
      status: "01",
      roles: ["01", "02"],
    };
    const reqUpdate = {
      centre_id: "id001",
      centre_name: "centre001",
      email: "sample@gmail.com",
      status: "01",
      roles: ["01", "02"],
    };

    const resultaddNew = service
      .updateUnit("addnew", reqAddNew)
      .subscribe((res: any) => {
        expect(res).toEqual({
          error_code: "00",
        });
      });
    const resultUpdate = service
      .updateUnit("update", reqAddNew)
      .subscribe((res: any) => {
        expect(res).toEqual({
          error_code: "00",
        });
      });
    httpMock.expectOne(`${AUTH_API_URL}/centre/addnew`).flush({
      error_code: "00",
    });
    httpMock.expectOne(`${AUTH_API_URL}/centre/update`).flush({
      error_code: "00",
    });
    httpMock.verify();
    expect(service).toBeTruthy();
  });
  it("should get status list", () => {
    let service = TestBed.get(CommonService);
    service.baseUrl = AUTH_API_URL + '/';
    let httpMock = TestBed.get(HttpTestingController);

    const result = service.GetListBoxData('centre_status').subscribe((res: any) => {
      expect(res).toEqual({
        error_code: "00",
        list_data: MockServiceStatus,
      });
    });
    httpMock.expectOne(`${AUTH_API_URL}/common/listbox`).flush({
      error_code: "00",
      list_data: MockServiceStatus,
    });
    httpMock.verify();
    expect(service).toBeTruthy();
  });
  it("should active or deactive unit", () => {
    let service = TestBed.get(UnitManagementService);
    service.baseUrl = AUTH_API_URL + '/';
    let httpMock = TestBed.get(HttpTestingController);
    const req = {
      centre_id: "id001",
      status: 1,
    };
    const result = service.active(req).subscribe((res: any) => {
      expect(res).toEqual({
        error_code: "00",
      });
    });
    httpMock.expectOne(`${AUTH_API_URL}/centre/active`).flush({
      error_code: "00",
    });
    httpMock.verify();
    expect(service).toBeTruthy();
  });
});
