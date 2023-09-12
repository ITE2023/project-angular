import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateModule, TranslateFakeLoader, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MockTranslateService, MockTranslateLoader, MockNoti } from 'src/app/shared/mockData/mockCommon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogMock } from 'src/app/shared/mockData/mockDialog';
import { of } from 'rxjs';


import { AUTH_API_URL } from '@core/constants';

import { MockMerchantList } from 'src/app/shared/mockData/mockMerchantService';
import { NotificationService } from './notification.service';



describe('Notification Service', () => {

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
                NotificationService
                // HttpTestingController
            ]
        });

    });

    it('should get noti list',
        () => {
            let service = TestBed.get(NotificationService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.getNotification({ page: 1, size: 10 }).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    total_record: 10,
                    list_data: MockNoti
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/notifications/get-all`).flush({
                error_code: '00',
                total_record: 10,
                list_data: MockNoti
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should get noti detail',
        () => {
            let service = TestBed.get(NotificationService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.getById(1007).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    data: MockNoti[0]
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/notifications/detail`).flush({
                error_code: '00',
                data: MockNoti[0]
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should get Newest Notification',
        () => {
            let service = TestBed.get(NotificationService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.getNewestNotification({ page: 1, size: 10 }).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    list_data: MockNoti
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/notifications/get-new`).flush({
                error_code: '00',
                list_data: MockNoti
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should mark all as read',
        () => {
            let service = TestBed.get(NotificationService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.markAllAsRead().subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/notifications/read-all`).flush({
                error_code: '00',
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should mark all as read or unread',
        () => {
            let service = TestBed.get(NotificationService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const request = {
                notifications: [1001, 1002, 1003],
                type: "read",
            }
            const result = service.markAsReadOrUnread(request).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/notifications/read`).flush({
                error_code: '00',
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should delete noti',
        () => {
            let service = TestBed.get(NotificationService);
            service.baseUrl = AUTH_API_URL + '/';
            let httpMock = TestBed.get(HttpTestingController);
            const req = { notifications: [1001], }
            const result = service.delete(req).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/notifications/delete`).flush({
                error_code: '00',
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should set noti number',
        () => {
            let service = TestBed.get(NotificationService);
            service.setChangeInPage(true);
            service.getChangeInPage().subscribe((res: any) => {
                expect(res).toEqual(true);
            });
            expect(service).toBeTruthy();
        });
});
