import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateModule, TranslateFakeLoader, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MockTranslateService, MockTranslateLoader } from 'src/app/shared/mockData/mockCommon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogMock } from 'src/app/shared/mockData/mockDialog';
import { of } from 'rxjs';

import { MockAgency, MockBusinessType, MockBusinessTypeTrue, MockPaymenMethod } from 'src/app/shared/mockData/mockCommonService';
import { MockServiceStatus } from 'src/app/web/merchant-management/merchant-edit-dialogs/merchant-contract-info-edit/merchant-contract-info-edit.component.spec';
import { MockDistrictList } from 'src/app/shared/mockData/mockAgencyService';
import { AUTH_API_URL } from '@core/constants';
import { MockMCCList, MockMCCGroup } from 'src/app/shared/mockData/mockMccService';
import { MerchantService } from './merchant.service';
import { MockMerchantList, MockMerchantBasicDetail, MockMerchantDetail, MockQR } from 'src/app/shared/mockData/mockMerchantService';
import { MockStaffList } from 'src/app/web/merchant-management/merchant-edit-dialogs/merchant-additional-info-edit/merchant-additional-info-staff/merchant-additional-info-staff.component.spec';
import { MockSubMerchantList, MockSubMerchantDetail } from 'src/app/web/merchant-management/sub-merchant-view-dialog/sub-merchant-view-dialog.component.spec';
import { CommonService } from '../common/common.service';



describe('Merchant Service', () => {

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
                MerchantService
                // HttpTestingController
            ]
        });

    });

    it('should getlist and filename from url',
        () => {
            let service = TestBed.get(MerchantService);
            service.baseUrl = AUTH_API_URL;
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.getMerchantLists({ page: 1, size: 10 }).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    total_record: 10,
                    list_data: MockMerchantList
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/merchant/search`).flush({
                error_code: '00',
                total_record: 10,
                list_data: MockMerchantList
            });
            const fileNameResult = service.getFileNameFromUrl('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');
            httpMock.verify();
            expect(fileNameResult).toEqual('dummy.pdf');
            expect(service).toBeTruthy();
        });
    it('should update basic info',
        () => {
            let service = TestBed.get(MerchantService);
            service.baseUrl = AUTH_API_URL;
            let httpMock = TestBed.get(HttpTestingController);
            let sampleBasic = service.simpleClone(MockMerchantBasicDetail);
            sampleBasic.website = 'https://ite.com.vn/';
            const result = service.UpdateBasicInfo(163, sampleBasic).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00'
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/merchant/edit-basic-info`).flush({
                error_code: '00'
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should update payment info',
        () => {
            let service = TestBed.get(MerchantService);
            service.baseUrl = AUTH_API_URL;
            let httpMock = TestBed.get(HttpTestingController);
            let samplePayment = {
                merchant: {
                    merchant_id: 163,
                    payment_info: {
                        settlement_day: 'day T+1',
                        holder_name: 'Nguyen Van A',
                        bank_bin: 'BIDV',
                        pan: '97046453756375',
                    },
                },
            };
            const result = service.UpdatePaymentInfo(samplePayment).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00'
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/merchant/edit-payment-info`).flush({
                error_code: '00'
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should update payment info',
        () => {
            let service = TestBed.get(MerchantService);
            service.baseUrl = AUTH_API_URL;
            let httpMock = TestBed.get(HttpTestingController);
            let samplePayment = {
                merchant: {
                    merchant_id: 163,
                    payment_info: {
                        settlement_day: 'day T+1',
                        holder_name: 'Nguyen Van A',
                        bank_bin: 'BIDV',
                        pan: '97046453756375',
                    },
                },
            };
            const result = service.UpdatePaymentInfo(samplePayment).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00'
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/merchant/edit-payment-info`).flush({
                error_code: '00'
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should approve or reject',
        () => {
            let service = TestBed.get(MerchantService);
            service.baseUrl = AUTH_API_URL;
            let httpMock = TestBed.get(HttpTestingController);
            let sampleApproveRequest = {
                merchant_id: 163,
                note: 'approve reason',
                approve: 1,
            };
            // let sampleRejectRequest = {
            //     merchant_id: 163,
            //     note: 'reject reason',
            //     approve: 0,
            // };
            const resultApprove = service.approveOrRejectMerchant(sampleApproveRequest).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00'
                });
            });
            // const result = service.approveOrRejectMerchant(sampleRejectRequest).subscribe((res: any) => {
            //     expect(res).toEqual({
            //         error_code: '00'
            //     });
            // });
            httpMock.expectOne(`${AUTH_API_URL}/merchant/approve`).flush({
                error_code: '00'
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should active or deactive merchant',
        () => {
            let service = TestBed.get(MerchantService);
            service.baseUrl = AUTH_API_URL;
            let httpMock = TestBed.get(HttpTestingController);
            let sampleRejectRequest = {
                merchant_id: 132,
                note: 'this.reject_reason?.trim()',
                active: 0,
            };
            const result = service.activeOrDeactiveMerchant(sampleRejectRequest).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00'
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/merchant/active`).flush({
                error_code: '00'
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should active or deactive merchant',
        () => {
            let service = TestBed.get(MerchantService);
            service.baseUrl = AUTH_API_URL;
            let httpMock = TestBed.get(HttpTestingController);
            let sampleRejectRequest = {
                merchant_id: 132,
                note: 'this.reject_reason?.trim()',
                active: 0,
            };
            const result = service.activeOrDeactiveMerchant(sampleRejectRequest).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00'
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/merchant/active`).flush({
                error_code: '00'
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should get staff list',
        () => {
            let service = TestBed.get(MerchantService);
            service.baseUrl = AUTH_API_URL;
            let httpMock = TestBed.get(HttpTestingController);
            let sampleRequest = {
                page: 1,
                size: 10
            };
            const result = service.getMerchantDetailStaffLists(sampleRequest).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    total_record: 10,
                    list_data: MockStaffList
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/common/staff-marketing-search`).flush({
                error_code: '00',
                total_record: 10,
                list_data: MockStaffList
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should get merchant detail',
        () => {
            let service = TestBed.get(MerchantService);
            service.baseUrl = AUTH_API_URL;
            let httpMock = TestBed.get(HttpTestingController);
            let sampleRequest = {
                merchant_id: 163,
            };
            const result = service.getMerchantDetail(sampleRequest).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    data: MockMerchantDetail
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/merchant/detail`).flush({
                error_code: '00',
                data: MockMerchantDetail
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should get merchant detail',
        () => {
            let service = TestBed.get(MerchantService);
            service.baseUrl = AUTH_API_URL;
            let httpMock = TestBed.get(HttpTestingController);
            let sampleRequest = {
                merchant_id: 163,
            };
            const result = service.getMerchantDetail(sampleRequest).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    data: MockMerchantDetail
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/merchant/detail`).flush({
                error_code: '00',
                data: MockMerchantDetail
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should get businessTypeList ',
        () => {
            let service = TestBed.get(CommonService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.GetListBoxData("business_status").subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    list_data: MockBusinessType
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/common/listbox`).flush({
                error_code: '00',
                list_data: MockBusinessType
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should get companyType ',
        () => {
            let service = TestBed.get(CommonService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.GetListBoxData("company_type").subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    list_data: MockBusinessTypeTrue
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/common/listbox`).flush({
                error_code: '00',
                list_data: MockBusinessTypeTrue
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should get paymentmethod ',
        () => {
            let service = TestBed.get(CommonService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.GetListBoxData("payment_method").subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    list_data: MockPaymenMethod
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/common/listbox`).flush({
                error_code: '00',
                list_data: MockPaymenMethod
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should update additional info with staff code',
        () => {
            let service = TestBed.get(MerchantService);
            service.baseUrl = AUTH_API_URL;
            let httpMock = TestBed.get(HttpTestingController);
            const blobImageShop = new Blob(["reughtrietiet"], { type: "image/jpg" });
            blobImageShop["lastModifiedDate"] = "";
            blobImageShop["name"] = "test1.png";
            const fileImageShop = new File([blobImageShop], blobImageShop["name"]);
            const blobidFront = new Blob(["reughtrietiet"], { type: "image/jpg" });
            blobidFront["lastModifiedDate"] = "";
            blobidFront["name"] = "test1.png";
            const fileIdFront = new File([blobidFront], blobidFront["name"]);
            const blobidback = new Blob(["reughtrietiet"], { type: "image/jpg" });
            blobidback["lastModifiedDate"] = "";
            blobidback["name"] = "test1.png";
            const fileidback = new File([blobidback], blobidback["name"]);
            const blobcertificate = new Blob(["reughtrietiet"], { type: "image/jpg" });
            blobcertificate["lastModifiedDate"] = "";
            blobcertificate["name"] = "test1.png";
            const filecertificate = new File([blobcertificate], blobcertificate["name"]);
            const result = service.updateAdditionalInfo(
                163,
                undefined,
                'staff001',
                [fileImageShop],
                fileIdFront,
                fileidback,
                filecertificate
            ).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/merchant/edit-additional-info`).flush({
                error_code: '00',
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should update additional info with reseller code',
        () => {
            let service = TestBed.get(MerchantService);
            service.baseUrl = AUTH_API_URL;
            let httpMock = TestBed.get(HttpTestingController);
            const blobImageShop = new Blob(["reughtrietiet"], { type: "image/jpg" });
            blobImageShop["lastModifiedDate"] = "";
            blobImageShop["name"] = "test1.png";
            const fileImageShop = new File([blobImageShop], blobImageShop["name"]);
            const blobidFront = new Blob(["reughtrietiet"], { type: "image/jpg" });
            blobidFront["lastModifiedDate"] = "";
            blobidFront["name"] = "test1.png";
            const fileIdFront = new File([blobidFront], blobidFront["name"]);
            const blobidback = new Blob(["reughtrietiet"], { type: "image/jpg" });
            blobidback["lastModifiedDate"] = "";
            blobidback["name"] = "test1.png";
            const fileidback = new File([blobidback], blobidback["name"]);
            const blobcertificate = new Blob(["reughtrietiet"], { type: "image/jpg" });
            blobcertificate["lastModifiedDate"] = "";
            blobcertificate["name"] = "test1.png";
            const filecertificate = new File([blobcertificate], blobcertificate["name"]);
            const result = service.updateAdditionalInfo(
                163,
                'reseller001',
                undefined,
                [fileImageShop],
                fileIdFront,
                fileidback,
                filecertificate
            ).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/merchant/edit-additional-info`).flush({
                error_code: '00',
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should update payment method info',
        () => {
            let service = TestBed.get(MerchantService);
            service.baseUrl = AUTH_API_URL;
            let httpMock = TestBed.get(HttpTestingController);

            const result = service.updatePaymentMethods(
                163,
                [
                    { paymentMethod: 1 },
                    { paymentMethod: 3 },
                    { paymentMethod: 5 },
                ]
            ).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/merchant/edit-payment-method`).flush({
                error_code: '00',
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should update contract info',
        () => {
            let service = TestBed.get(MerchantService);
            service.baseUrl = AUTH_API_URL;
            let httpMock = TestBed.get(HttpTestingController);
            const blobImageShop = new Blob(["reughtrietiet"], { type: "image/jpg" });
            blobImageShop["lastModifiedDate"] = "";
            blobImageShop["name"] = "test1.png";
            const fileImageShop = new File([blobImageShop], blobImageShop["name"]);
            const result = service.updateContractInfo(
                [{ file: blobImageShop, name: blobImageShop['name'] }],
                {
                    merchant: {
                        merchant_id: 163
                    }
                }
            ).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/merchant/edit-contract`).flush({
                error_code: '00',
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should check staff code ',
        () => {
            let service = TestBed.get(MerchantService);
            service.baseUrl = AUTH_API_URL;
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.checkStaffCode('staff001').subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00'
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/common/staff-marketing-check`).flush({
                error_code: '00'
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should add new merchant',
        () => {
            let service = TestBed.get(MerchantService);
            service.baseUrl = AUTH_API_URL;
            let httpMock = TestBed.get(HttpTestingController);
            const blobImageShop = new Blob(["reughtrietiet"], { type: "image/jpg" });
            blobImageShop["lastModifiedDate"] = "";
            blobImageShop["name"] = "test1.png";
            const fileImageShop = new File([blobImageShop], blobImageShop["name"]);
            const blobidFront = new Blob(["reughtrietiet"], { type: "image/jpg" });
            blobidFront["lastModifiedDate"] = "";
            blobidFront["name"] = "test1.png";
            const fileIdFront = new File([blobidFront], blobidFront["name"]);
            const blobidback = new Blob(["reughtrietiet"], { type: "image/jpg" });
            blobidback["lastModifiedDate"] = "";
            blobidback["name"] = "test1.png";
            const fileidback = new File([blobidback], blobidback["name"]);
            const blobcertificate = new Blob(["reughtrietiet"], { type: "image/jpg" });
            blobcertificate["lastModifiedDate"] = "";
            blobcertificate["name"] = "test1.png";
            const filecertificate = new File([blobcertificate], blobcertificate["name"]);
            const result = service.addNewMerchant(
                { merchant_name: 'sample merchant' },
                [fileImageShop],
                fileIdFront,
                fileidback,
                filecertificate
            ).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/merchant/addnew`).flush({
                error_code: '00',
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should check Merchant Email ',
        () => {
            let service = TestBed.get(MerchantService);
            service.baseUrl = AUTH_API_URL;
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.checkMerchantEmail('pls@gmail.com').subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00'
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/merchant/check-email`).flush({
                error_code: '00'
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should check merchant phone ',
        () => {
            let service = TestBed.get(MerchantService);
            service.baseUrl = AUTH_API_URL;
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.checkMerchantPhone('0347548786').subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00'
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/merchant/check-phone`).flush({
                error_code: '00'
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should get sub merchant list ',
        () => {
            let service = TestBed.get(MerchantService);
            service.baseUrl = AUTH_API_URL;
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.getSubMerchantList(153).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    list_data: MockSubMerchantList,
                    total_record: 10
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/merchant/sub/search`).flush({
                error_code: '00',
                list_data: MockSubMerchantList,
                total_record: 10
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should get sub merchant detail ',
        () => {
            let service = TestBed.get(MerchantService);
            service.baseUrl = AUTH_API_URL;
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.getSubMerchantDetail('174').subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    data: MockSubMerchantDetail
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/merchant/sub/detail`).flush({
                error_code: '00',
                data: MockSubMerchantDetail
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should get QR list',
        () => {
            let service = TestBed.get(MerchantService);
            service.baseUrl = AUTH_API_URL;
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.getQRCodeList({
                merchant_id: 163,
                page: 1,
                size: 10
            }).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    list_data: MockQR
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/merchant/qr/list`).flush({
                error_code: '00',
                list_data: MockQR
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
});
