import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateModule, TranslateFakeLoader, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MockTranslateService, MockTranslateLoader } from 'src/app/shared/mockData/mockCommon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogMock } from 'src/app/shared/mockData/mockDialog';
import { of } from 'rxjs';


import { AUTH_API_URL, NO_AUTH_API_URL } from '@core/constants';

import { MockPaymenMethod, MockProfile, MockHistory } from 'src/app/shared/mockData/mockCommonService';
import { ProfileService } from './profile.service';
import { ProfileShare } from './profile-share.service';

describe('Profile Service', () => {

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
                ProfileService,
                ProfileShare
                // HttpTestingController
            ]
        });

    });
    it('should profile share clear',
        () => {
            let service = TestBed.get(ProfileShare);
            service.clearProfile();
            service.getProfileInfo().subscribe((res: any) => {
                expect(res).toBeFalsy();
            })
            expect(service).toBeTruthy();
        });
    it('should get profile when set profile',
        () => {
            let service = TestBed.get(ProfileShare);
            service.setProfileInfo('avatarUrl', 'displayName');
            service.getProfileInfo().subscribe((res: any) => {
                expect(res).toEqual({
                    profileName: 'avatarUrl',
                    avatarUrl: 'displayName'
                });
            })
            expect(service).toBeTruthy();
        });
    it('should getprofile detail',
        () => {
            let service = TestBed.get(ProfileService);
            service.baseUrl = AUTH_API_URL ;
            let httpMock = TestBed.get(HttpTestingController);
            const result = service.detailProfile().subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    data: MockProfile
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/profile/detail`).flush({
                error_code: '00',
                data: MockProfile
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should update profile',
        () => {
            let service = TestBed.get(ProfileService);
            service.baseUrl = AUTH_API_URL ;
            let httpMock = TestBed.get(HttpTestingController);
            const request = {
                fullname: 'Nguyen Van A',
                phone: '0957475387',
                language: 'en'
            }
            const result = service.updateProfile(request).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00'
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/profile/edit`).flush({
                error_code: '00'
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should change password',
        () => {
            let service = TestBed.get(ProfileService);
            service.baseUrl = AUTH_API_URL ;
            let httpMock = TestBed.get(HttpTestingController);
            const request = {
                old_password: '12345@bC',
                new_password: '12345@bC'
            }
            const result = service.updatePassword(request).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00'
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/profile/update-password`).flush({
                error_code: '00'
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should confirm reset password',
        () => {
            let service = TestBed.get(ProfileService);
            service.baseUrl2 = NO_AUTH_API_URL ;
            let httpMock = TestBed.get(HttpTestingController);
            const request = {
                contact: 'pls@gmail.com'
            }
            const result = service.confirmResetPws(request).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00'
                });
            });
            httpMock.expectOne(`${NO_AUTH_API_URL}/forgot-password`).flush({
                error_code: '00'
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should return language list',
        () => {
            let service = TestBed.get(ProfileService);
            service.baseUrl = AUTH_API_URL ;
            let httpMock = TestBed.get(HttpTestingController);
            const request = {
                contact: 'pls@gmail.com'
            }
            const mockLang = [{ desc: 'vi' }, { desc: 'en' }]
            const result = service.getLanguageList().subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    list_data: mockLang
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/common/listbox`).flush({
                error_code: '00',
                list_data: mockLang
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should return language list with empty res',
        () => {
            let service = TestBed.get(ProfileService);
            service.baseUrl = AUTH_API_URL ;
            let httpMock = TestBed.get(HttpTestingController);
            const request = {
                contact: 'pls@gmail.com'
            }
            const result = service.getLanguageList().subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00'
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/common/listbox`).flush({
                error_code: '00'
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should return activity history',
        () => {
            let service = TestBed.get(ProfileService);
            service.baseUrl = AUTH_API_URL ;
            let httpMock = TestBed.get(HttpTestingController);
            const request = {
                page: 1,
                size: 10
            }
            const result = service.getActivityHistory(request).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    list_data: MockHistory
                });
            });
            httpMock.expectOne(`${AUTH_API_URL}/account/actions`).flush({
                error_code: '00',
                list_data: MockHistory
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('should confirm new password',
        () => {
            let service = TestBed.get(ProfileService);
            service.baseUrl2 = NO_AUTH_API_URL ;
            let httpMock = TestBed.get(HttpTestingController);
            const request = {
                ref_id: 123,
                otp: '7438574835',
                new_password: '734835738@cbwer'
            }
            const result = service.confirmNewPassWord(request).subscribe((res: any) => {
                expect(res).toEqual({
                    error_code: '00',
                    list_data: MockHistory
                });
            });
            httpMock.expectOne(`${NO_AUTH_API_URL}/confirm-password`).flush({
                error_code: '00',
                list_data: MockHistory
            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
});
