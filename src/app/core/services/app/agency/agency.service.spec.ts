import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateModule, TranslateFakeLoader, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MockTranslateService, MockTranslateLoader } from 'src/app/shared/mockData/mockCommon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogMock } from 'src/app/shared/mockData/mockDialog';
import { LocalStorageType, NO_AUTH_API_URL, AUTH_API_URL } from '@core/constants';
import { MockUserInfo, MockLeftMenuConfig, MockLoginUserInfo, MockRights, MockPermissionUrl } from 'src/app/shared/mockData/mockAuthService';
import { DeviceDetectorService } from 'ngx-device-detector';
import { of } from 'rxjs';
import { doesNotMatch } from 'assert';
import { AgencyService } from './agency.service';
import { MockAgency } from 'src/app/shared/mockData/mockCommonService';
import { MockServiceStatus } from 'src/app/web/merchant-management/merchant-edit-dialogs/merchant-contract-info-edit/merchant-contract-info-edit.component.spec';
import { MockDistrictList } from 'src/app/shared/mockData/mockAgencyService';
import { CommonService } from '../common/common.service';



describe('Agency Service', () => {

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
                AgencyService

                // HttpTestingController
            ]
        });

    });

    it('should getlist',
        () => {
            let service = TestBed.get(AgencyService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.getList({ page: 1, size: 10 }).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    total_record: 10,
                    list_data: MockAgency
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/agency/search`).flush({
                error_code: '00',
                total_record: 10,
                list_data: MockAgency
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should get agency detail',
        () => {
            let service = TestBed.get(AgencyService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.getAgencyById({ agency_id: 'agency001' }).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    data: MockAgency[0],
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/agency/detail`).flush({
                error_code: '00',
                data: MockAgency[0],
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should update agency',
        () => {
            let service = TestBed.get(AgencyService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.update('update', { agency_id: 'agency001' }).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/agency/update`).flush({
                error_code: '00',
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should update contract info',
        () => {
            let service = TestBed.get(AgencyService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const blobSamplePng = new Blob(["reughtrietiet"], { type: "image/png" });
            blobSamplePng["lastModifiedDate"] = "";
            blobSamplePng["name"] = "test1.png";
            const mockBrowserInfo = {
                device: {
                    os: {
                        name: 'Windows',
                        version: 'windows-10',
                    },
                    browser: {
                        name: 'Chrome',
                        version: '84.0.4147.125',
                    },
                    location: {
                        'long': 0,
                        lat: 0,
                    },
                },
                ip_address: '118.70.124.48',
            }
            const result = service.updateContractInfo([{ file: blobSamplePng, name: blobSamplePng['name'] }], mockBrowserInfo).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/agency/edit-contract`).flush({
                error_code: '00',
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should update account info',
        () => {
            let service = TestBed.get(AgencyService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.updateAccountInfo({
                agency: {
                    agency_id: 'agency001',
                    payment_info: {
                        settlement_day: 'day T+1',
                        holder_name: 'NGUYEN VAN A',
                        pan: '003483',
                        bank_bin: '000538475384',
                    },
                },
            }).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/agency/edit-pay-info`).flush({
                error_code: '00',
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should get contract status',
        () => {
            let service = TestBed.get(CommonService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.GetListBoxData("contract_status").subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    list_data: MockServiceStatus,
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/common/listbox`).flush({
                error_code: '00',
                list_data: MockServiceStatus,
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should get service status',
        () => {
            let service = TestBed.get(CommonService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.GetListBoxData("service_status").subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    list_data: MockServiceStatus,
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/common/listbox`).flush({
                error_code: '00',
                list_data: MockServiceStatus,
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should active',
        () => {
            let service = TestBed.get(AgencyService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.active({ agency_id: 'agency001' }).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/agency/activate`).flush({
                error_code: '00',
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should approval',
        () => {
            let service = TestBed.get(AgencyService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.approval({ agency_id: 'agency001' }).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/agency/approve`).flush({
                error_code: '00',
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should get address',
        () => {
            let service = TestBed.get(AgencyService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.getAddress({
                key: "district",
                id: '00043',
            }).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    data: MockDistrictList,
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/common/address`).flush({
                error_code: '00',
                data: MockDistrictList,
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
});
