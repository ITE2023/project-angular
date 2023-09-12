import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateModule, TranslateFakeLoader, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MockTranslateService, MockTranslateLoader } from 'src/app/shared/mockData/mockCommon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogMock } from 'src/app/shared/mockData/mockDialog';
import { of } from 'rxjs';

import { MockAgency } from 'src/app/shared/mockData/mockCommonService';
import { MockServiceStatus } from 'src/app/web/merchant-management/merchant-edit-dialogs/merchant-contract-info-edit/merchant-contract-info-edit.component.spec';
import { MockDistrictList } from 'src/app/shared/mockData/mockAgencyService';
import { MCCManagementService } from './mcc-management.service';
import { AUTH_API_URL } from '@core/constants';
import { MockMCCList, MockMCCGroup } from 'src/app/shared/mockData/mockMccService';



describe('MCC Service', () => {

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
                MCCManagementService

                // HttpTestingController
            ]
        });

    });

    it('should getlist',
        () => {
            let service = TestBed.get(MCCManagementService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.getList({ page: 1, size: 10 }).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    total_record: 10,
                    list_data: MockMCCList
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/mcc/search`).flush({
                error_code: '00',
                total_record: 10,
                list_data: MockMCCList
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should get mcc group list',
        () => {
            let service = TestBed.get(MCCManagementService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.getGroupList({ page: 1, size: 10 }).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    total_record: 10,
                    list_data: MockMCCGroup
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/mcc/group/search`).flush({
                error_code: '00',
                total_record: 10,
                list_data: MockMCCGroup
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should get mcc list to add',
        () => {
            let service = TestBed.get(MCCManagementService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.getMCCToAdd({ page: 1, size: 10 }).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    list_data: MockMCCList
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/mcc/get-list`).flush({
                error_code: '00',
                list_data: MockMCCList
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should add MCC to Group',
        () => {
            let service = TestBed.get(MCCManagementService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.addMCCToGroup({
                group_code: 'group001',
                array_mcc: ['mcc01', 'mcc02'],
            }).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/mcc/group/add-mcc`).flush({
                error_code: '00',
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should updateGroupMCC',
        () => {
            let service = TestBed.get(MCCManagementService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const mockGroup = {
                group_code: 'code001',
                group_name: 'group001',
                status: '01',
                description: 'desc001'
            };
            const resultadd = service.updateGroupMCC('addnew', mockGroup).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                });
            });
            const resultUpdate = service.updateGroupMCC('update', mockGroup).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/mcc/group/addnew`).flush({
                error_code: '00',
            });
            httpMock.expectOne(`${AUTH_API_URL}/mcc/group/update`).flush({
                error_code: '00',
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should get list mcc group to delete',
        () => {
            let service = TestBed.get(MCCManagementService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.getMCCToDelete({ page: 1, size: 10 }).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    list_data: MockMCCGroup
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/mcc/group/get-list-mcc`).flush({
                error_code: '00',
                list_data: MockMCCGroup
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should delete mcc group',
        () => {
            let service = TestBed.get(MCCManagementService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.deleteMCC({
                group_code: 'groupcode001',
                mcc_code: 'mcc001'
            }).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/mcc/group/remove-mcc`).flush({
                error_code: '00',
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should get status list',
        () => {
            let service = TestBed.get(MCCManagementService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.getStatusList().subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    list_data: MockServiceStatus
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/mcc/get-list-status`).flush({
                error_code: '00',
                list_data: MockServiceStatus
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should active or inactive',
        () => {
            let service = TestBed.get(MCCManagementService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const request = {
                group_code: 'group001'
            }
            const resultActive = service.active('active', request).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                });
            });
            const resultDeactive = service.active('inactive', request).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/mcc/group/active`).flush({
                error_code: '00',
            });
            httpMock.expectOne(`${AUTH_API_URL}/mcc/group/inactive`).flush({
                error_code: '00',
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
});
