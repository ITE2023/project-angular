import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateModule, TranslateFakeLoader, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MockTranslateService, MockTranslateLoader } from 'src/app/shared/mockData/mockCommon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogMock } from 'src/app/shared/mockData/mockDialog';
import { of } from 'rxjs';


import { AUTH_API_URL } from '@core/constants';
import { PaymentMethodService } from './payment-method.service';
import { MockPaymenMethod, MockBank } from 'src/app/shared/mockData/mockCommonService';
import { MockServiceStatus } from 'src/app/web/merchant-management/merchant-edit-dialogs/merchant-contract-info-edit/merchant-contract-info-edit.component.spec';
import { CommonService } from '../common/common.service';

describe('Payment method Service', () => {

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
                PaymentMethodService
                // HttpTestingController
            ]
        });

    });

    it('should get payment list',
        () => {
            let service = TestBed.get(PaymentMethodService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.getList({ page: 1, size: 10 }).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    total_record: 10,
                    list_data: MockPaymenMethod
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/payment-method/search`).flush({
                error_code: '00',
                total_record: 10,
                list_data: MockPaymenMethod
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should get payment detail',
        () => {
            const rq = {
                method_id: 101,
            };
            let service = TestBed.get(PaymentMethodService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.getPMbyId(rq).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    data: MockPaymenMethod[0]
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/payment-method/detail`).flush({
                error_code: '00',
                data: MockPaymenMethod[0]
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should update payment method',
        () => {
            const request: any = {
                method_name: 'method001',
                issuer: 'BIDV',
                des: 'desc001'
            };
            let service = TestBed.get(PaymentMethodService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const resultaddNew = service.updatePM('addnew', request).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00'
                });
            });
            const resultUpdate = service.updatePM('update', request).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00'
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/payment-method/addnew`).flush({
                error_code: '00',
            });
            httpMock.expectOne(`${AUTH_API_URL}/payment-method/update`).flush({
                error_code: '00',
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should get status list',
        () => {

            let service = TestBed.get(CommonService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.GetListBoxData('payment_method_status').subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    list_data: MockServiceStatus
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/common/listbox`).flush({
                error_code: '00',
                list_data: MockServiceStatus
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should get issuerList',
        () => {
            const rq = {
                method_id: 101,
            };
            let service = TestBed.get(CommonService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.GetListBoxData('issuer').subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    list_data: MockBank
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/common/listbox`).flush({
                error_code: '00',
                list_data: MockBank
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should active or deactive a payment method',
        () => {
            const request: any = {
                method_id: 'method001', active: 1
            };
            let service = TestBed.get(PaymentMethodService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.active(request).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/payment-method/active`).flush({
                error_code: '00',
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should approval or reject a payment method',
        () => {
            const request: any = {
                method_id: 'method001', approve: 1
            };
            let service = TestBed.get(PaymentMethodService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.approval(request).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/payment-method/approve`).flush({
                error_code: '00',
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should change payment logo',
        () => {
            const rq = {
                method_id: 101,
            };
            const blobcertificate = new Blob(["reughtrietiet"], { type: "image/jpg" });
            blobcertificate["lastModifiedDate"] = "";
            blobcertificate["name"] = "test1.png";
            const filecertificate = new File([blobcertificate], blobcertificate["name"]);
            let service = TestBed.get(PaymentMethodService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.changeLogo(filecertificate, rq).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/payment-method/edit-logo`).flush({
                error_code: '00',
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
});
