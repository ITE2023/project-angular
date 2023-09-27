import { HttpClient } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatDialog } from "@angular/material/dialog";
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";
import {
  MockTranslateLoader,
  MockTranslateService,
} from "src/app/shared/mockData/mockCommon";
import { MatDialogMock } from "src/app/shared/mockData/mockDialog";

import { AUTH_API_URL } from "@core/constants";
import { ToastrModule } from "ngx-toastr";
import {
  MockOutputUsers,
  MockRole,
  MockUsers
} from "src/app/shared/mockData/mockCommonService";
import { UserService } from "./user.service";

describe("UserManagement Service", () => {
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
        ToastrModule.forRoot(),
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
        UserService,
        // HttpTestingController
      ],
    });
  });

  it("should get user list", () => {
    let service = TestBed.get(UserService);
    service.baseUrl = AUTH_API_URL;
    let httpMock = TestBed.get(HttpTestingController);
    const req = { page: 1, size: 10 };
    const result = service.getUser(req).subscribe((res: any) => {
      let emptyOutput = service.convertUserListFromObject(undefined);
      let output = service.convertUserListFromObject(res.list_data);
      expect(emptyOutput).toBeFalsy();
      expect(output).toEqual(MockOutputUsers);
      expect(res).toEqual({
        error_code: "00",
        total_record: 10,
        list_data: MockUsers,
      });
    });
    httpMock.expectOne(`${AUTH_API_URL}/users/search`).flush({
      error_code: "00",
      total_record: 10,
      list_data: MockUsers,
    });
    httpMock.verify();
    expect(service).toBeTruthy();
  });
  it("should change profile", () => {
    let service = TestBed.get(UserService);
    service.baseUrl = AUTH_API_URL;
    let httpMock = TestBed.get(HttpTestingController);
    const req = { page: 1, size: 10 };
    const blobImageShop = new Blob(["reughtrietiet"], { type: "image/jpg" });
    blobImageShop["lastModifiedDate"] = "";
    blobImageShop["name"] = "test1.png";
    const fileImageShop = new File([blobImageShop], blobImageShop["name"]);
    const result = service
      .changeAvatar(fileImageShop, req)
      .subscribe((res: any) => {
        expect(res).toEqual({
          error_code: "00",
        });
      });
    httpMock.expectOne(`${AUTH_API_URL}/profile/edit-avatar`).flush({
      error_code: "00",
    });
    httpMock.verify();
    expect(service).toBeTruthy();
  });
  it("should get user detail by id", () => {
    let service = TestBed.get(UserService);
    service.baseUrl = AUTH_API_URL;
    let httpMock = TestBed.get(HttpTestingController);

    const result = service.getById('163').subscribe((res: any) => {
      let emptyOutput = service.convertUserFromObject(undefined);
      let output = service.convertUserFromObject(res.data);
      expect(emptyOutput).toBeFalsy();
      expect(output).toEqual({
        id: 402,
        fullName: 'Trần Văn Thành',
        account: 'thanh',
        phone: '0975588771',
        role: 'TCĐS -Nhân viên',
        roleId: 10,
        department: 'Full quyền',
        email: 'qhacvkxh@zeroe.ml',
        status: 1,
        address: undefined,
        createdDate: undefined,
        id_number: undefined,
        statusName: 'Active',
        departmentId: 201,
      });
      expect(res).toEqual({
        error_code: "00",
        data: MockUsers[0],
      });
    });
    httpMock.expectOne(`${AUTH_API_URL}/users/detail`).flush({
      error_code: "00",
      data: MockUsers[0],
    });
    httpMock.verify();
    expect(service).toBeTruthy();
  });
  it("should update user", () => {
    let service = TestBed.get(UserService);
    service.baseUrl = AUTH_API_URL;
    let httpMock = TestBed.get(HttpTestingController);
    const request = {
      user_id: 163,
      fullname: 'Nguyễn Văn Hưng',
      status: 1,
      phone: '094738473485',
      centre_id: 123,
      role_id: 10,
      language: 'vi',
    };
    const result = service.updateUser(request).subscribe((res: any) => {
      expect(res).toEqual({
        error_code: "00",
      });
    });
    httpMock.expectOne(`${AUTH_API_URL}/users/edit`).flush({
      error_code: "00",
    });
    httpMock.verify();
    expect(service).toBeTruthy();
  });
  it("should add new user", () => {
    let service = TestBed.get(UserService);
    service.baseUrl = AUTH_API_URL;
    let httpMock = TestBed.get(HttpTestingController);
    const request = {
      user_id: 163,
      fullname: 'Nguyễn Văn Hưng',
      status: 1,
      phone: '094738473485',
      centre_id: 123,
      role_id: 10,
      language: 'vi',
      email: 'sampleemail@gmail.com',
      channel: 'VIETTELPAY',
    };

    const result = service.addNewUser(request).subscribe((res: any) => {
      expect(res).toEqual({
        error_code: "00",
      });
    });
    httpMock.expectOne(`${AUTH_API_URL}/users/addnew`).flush({
      error_code: "00",
    });
    httpMock.verify();
    expect(service).toBeTruthy();
  });
  it("should active,approve an user get role by centre ", () => {
    let service = TestBed.get(UserService);
    service.baseUrl = AUTH_API_URL;
    let httpMock = TestBed.get(HttpTestingController);
    const request: any = {
      user_id: 163,
      active: 1
    };

    const result = service.active(request).subscribe((res: any) => {
      expect(res).toEqual({
        error_code: "00",
      });
    });
    const resultapprove = service.approveUser(request).subscribe((res: any) => {
      expect(res).toEqual({
        error_code: "00",
      });
    });
    const getListResult = service.getRoleByCentre(request).subscribe((res: any) => {
      expect(res).toEqual({
        error_code: "00",
        list_data: MockRole
      });
    });
    httpMock.expectOne(`${AUTH_API_URL}/users/activate`).flush({
      error_code: "00",
    });
    httpMock.expectOne(`${AUTH_API_URL}/users/approve`).flush({
      error_code: "00",
    });
    httpMock.expectOne(`${AUTH_API_URL}/common/listbox`).flush({
      error_code: "00",
      list_data: MockRole
    });
    httpMock.verify();
    expect(service).toBeTruthy();
  });
  it("should reset password and generate hash password", () => {
    let service = TestBed.get(UserService);
    service.baseUrl = AUTH_API_URL;
    let httpMock = TestBed.get(HttpTestingController);
    const request: any = {
      user_id: 163,
    };
    const hashedPass = service.generatePasswordHash('aBc@12345');
    const expectedResult = '029df6196a6cd9a9405afb81f11c6782';
    const result = service.resetPassword(request).subscribe((res: any) => {
      expect(res).toEqual({
        error_code: "00",
      });
    });

    httpMock.expectOne(`${AUTH_API_URL}/users/reset-user-password`).flush({
      error_code: "00",
    });

    httpMock.verify();
    expect(hashedPass).toEqual(expectedResult);
    expect(service).toBeTruthy();
  });
});
