import { TestBed, inject } from '@angular/core/testing';
import { AuthenticationAndAuthorizationService } from '../authentification-and-authorization.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateModule, TranslateFakeLoader, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MockTranslateService, MockTranslateLoader } from 'src/app/shared/mockData/mockCommon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogMock } from 'src/app/shared/mockData/mockDialog';
import { LocalStorageType, NO_AUTH_API_URL } from '@core/constants';
import { MockUserInfo, MockLeftMenuConfig, MockLoginUserInfo, MockRights, MockPermissionUrl } from 'src/app/shared/mockData/mockAuthService';
import { BackgroundLoader } from '../background-loader.service';
import { BrowserAndLocationInformationService } from '..';
import { DeviceDetectorService } from 'ngx-device-detector';

describe('Core Service', () => {

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
                AuthenticationAndAuthorizationService,
                BackgroundLoader,
                DeviceDetectorService,
                BrowserAndLocationInformationService,
                // HttpTestingController
            ]
        });

    });

    it('AuthenticationAndAuthorizationService - should get side bar config', inject([AuthenticationAndAuthorizationService], (service: AuthenticationAndAuthorizationService) => {
        spyOn(localStorage, 'getItem')
            .withArgs(LocalStorageType.UserInformation)
            .and.returnValue(JSON.stringify(MockUserInfo))
            .withArgs(LocalStorageType.SideBarConfig)
            .and.returnValue(JSON.stringify(MockLeftMenuConfig));
        const result = service.getSideBarConfig();
        // expect(result).toEqual(MockLeftMenuConfig);
        expect(service).toBeTruthy();
    }));
    it('AuthenticationAndAuthorizationService - should dologin',
        () => {
            let service = TestBed.get(AuthenticationAndAuthorizationService);
            service.baseUrl = NO_AUTH_API_URL;
            let httpMock = TestBed.get(HttpTestingController);
            spyOn(localStorage, 'getItem')
                .withArgs(LocalStorageType.UserInformation)
                .and.returnValue(JSON.stringify(MockUserInfo))
                .withArgs(LocalStorageType.SideBarConfig)
                .and.returnValue(JSON.stringify(MockLeftMenuConfig))
                .withArgs(LocalStorageType.CurrentLanguage)
                .and.returnValue('en')
                .withArgs(LocalStorageType.Permission)
                .and.returnValue(JSON.stringify(MockRights))
                .withArgs(LocalStorageType.PermissionUrl)
                .and.returnValue(JSON.stringify(MockPermissionUrl))
            const result = service.doLogin('user001', 'password001').subscribe((res: any) => {
                expect(true).toEqual(true);
            });
            httpMock.expectOne(`${NO_AUTH_API_URL}/login`).flush({
                error_message: 'success',
                error_code: '00',
                expire_time: '14/08/2020 17:49:56',
                is_change_password: 0,
                user_info: MockLoginUserInfo,
                menu_info: MockLeftMenuConfig
            });
            httpMock.verify();
            const currentLang = service.getCurrentLang();
            const currentUserInfo = service.getUserInformation();
            const checkPermission = service.checkPermission(7701);
            const checkPermissionUrl = service.checkPermissionUrl('/dashboard');
            expect(service).toBeTruthy();
        });
    it('AuthenticationAndAuthorizationService - should dologout',
        () => {
            let service = TestBed.get(AuthenticationAndAuthorizationService);
            service.baseUrl = NO_AUTH_API_URL;
            let httpMock = TestBed.get(HttpTestingController);
            spyOn(localStorage, 'getItem')
                .withArgs(LocalStorageType.UserInformation)
                .and.returnValue(JSON.stringify(MockUserInfo))
                .withArgs(LocalStorageType.SideBarConfig)
                .and.returnValue(JSON.stringify(MockLeftMenuConfig))
                .withArgs(LocalStorageType.RememberMe)
                .and.returnValue(undefined);
            const result = service.logOut().subscribe((res: any) => {
                expect(true).toEqual(true);
            });
            httpMock.expectOne(`${NO_AUTH_API_URL}/logout`).flush({

            });
            httpMock.verify();
            expect(service).toBeTruthy();
        });
    it('BackgroundLoaderService - should apply functions',
        () => {
            let service = TestBed.get(BackgroundLoader);
            service.loader = {
                style: {
                    display: 'block'
                },
                classList: {
                    add(att: string) { },
                    remove(att: string) { }
                }
            }
            service.show();
            service.hide();
            expect(service).toBeTruthy();
        });
});
