import { async, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogMock } from 'src/app/shared/mockData/mockDialog';
import { mockDialogRef, MockEvent } from 'src/app/shared/mockData/mockCommon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BackgroundLoader, BrowserAndLocationInformationService } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/shared/material.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { LocalStorageType } from '@core/constants';
import { LoginComponent } from './login.component';
import { MockBrowserAndLocationInformationService } from '@core/app/app.component.spec';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MockLeftMenuConfig, MockLeftMenuConfig2 } from 'src/app/shared/mockData/mockAuthService';
describe("Login Component", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useClass: TranslateFakeLoader,
                        deps: [HttpClient],
                    },
                }),
                MaterialModule,
                ToastrModule.forRoot(),
                BrowserAnimationsModule,
            ],
            declarations: [LoginComponent],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: mockDialogRef,
                },
                BackgroundLoader,
                FormBuilder,
                {
                    provide: BrowserAndLocationInformationService,
                    useClass: MockBrowserAndLocationInformationService,
                },
                DeviceDetectorService,
                // {
                //     provide: CommonService,
                //     useClass: MockCommonService,
                // },
                // FormBuilder,
                // BackgroundLoader,
                // ToastrService,
                // {
                //     provide: AuthenticationAndAuthorizationService,
                //     useClass: MockAuthService,
                // },
                // {
                //     provide: Router,
                //     useClass: MockRouter,
                // },
                // CommonService,
                // {
                //     provide: TranslateService,
                //     useClass: MockTranslateService,
                // },
                {
                    provide: MatDialog,
                    useClass: MatDialogMock,
                },
            ],
        }).compileComponents();

    }));

    it("should create the app and do login with remember me", () => {
        spyOn(localStorage, 'getItem').withArgs(LocalStorageType.RememberMe).and.returnValue(
            undefined
        )
            .withArgs(LocalStorageType.UserInformation).and.returnValue(
                JSON.stringify({
                    acc: 'id001',
                    pass: 'pass001'
                })
            )
            .withArgs(LocalStorageType.LoginLanguage).and.returnValue(
                undefined
            )
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(app.route, 'navigate').and.callThrough();
        spyOn(app.authService, 'doLogin').and.returnValue(
            of(
                true
            )
        );
        spyOn(app.authService, 'getSideBarConfig').and.returnValue(MockLeftMenuConfig);
        fixture.detectChanges();
        app.register();
        app.redirect();
        app.togglePw();
        const event = new MockEvent();
        app.enter(event);
        app.loginForm.controls['username'].setValue('user01');
        app.loginForm.controls['password'].setValue('password01');
        app.loginForm.controls['remember_me'].setValue(true);
        app.enter(event);
        const eventCheck = {
            target: {
                checked: true
            }
        }
        app.setValue(eventCheck);
        app.openChangePasswordModal();
        expect(app).toBeTruthy();
    })
    it("should navigate if already login", () => {
        spyOn(localStorage, 'getItem').withArgs(LocalStorageType.RememberMe).and.returnValue(
            JSON.stringify({
                acc: 'id001',
                pass: 'pass001'
            })
        )
            .withArgs(LocalStorageType.UserInformation).and.returnValue(
                JSON.stringify({
                    acc: 'id001',
                    pass: 'pass001'
                })
            )
            .withArgs(LocalStorageType.LoginLanguage).and.returnValue(
                'en'
            )
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(app.route, 'navigate').and.callThrough();
        spyOn(app.authService, 'checkLogin').and.returnValue(
            of(
                true
            )
        );

        fixture.detectChanges();
        expect(app).toBeTruthy();
    })
    it("should create the app and do login with no remember me", () => {
        spyOn(localStorage, 'getItem').withArgs(LocalStorageType.RememberMe).and.returnValue(
            JSON.stringify({
                acc: 'id001',
                pass: 'pass001'
            })
        )
            .withArgs(LocalStorageType.UserInformation).and.returnValue(
                JSON.stringify({
                    acc: 'id001',
                    pass: 'pass001'
                })
            )
            .withArgs(LocalStorageType.LoginLanguage).and.returnValue(
                'en'
            )
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(app.route, 'navigate').and.callThrough();
        spyOn(app.authService, 'doLogin').and.returnValue(
            of(
                true
            )
        );
        spyOn(app.authService, 'getSideBarConfig').and.returnValue(MockLeftMenuConfig2);
        fixture.detectChanges();
        app.loginForm.controls['remember_me'].setValue(false);
        const event = new MockEvent();
        app.enter(event);
        app.focusEvent();
        expect(app).toBeTruthy();
    })
    it("should create the app and do login with change password required", () => {
        spyOn(localStorage, 'getItem').withArgs(LocalStorageType.RememberMe).and.returnValue(
            JSON.stringify({
                acc: 'id001',
                pass: 'pass001'
            })
        )
            .withArgs(LocalStorageType.UserInformation).and.returnValue(
                JSON.stringify({
                    acc: 'id001',
                    pass: 'pass001'
                })
            )
            .withArgs(LocalStorageType.LoginLanguage).and.returnValue(
                'en'
            )
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(app.route, 'navigate').and.callThrough();
        spyOn(app.authService, 'doLogin').and.returnValue(
            of(
                {
                    error_message: 1,
                    is_change_password: 1
                }
            )
        );
        spyOn(app.authService, 'getSideBarConfig').and.returnValue(MockLeftMenuConfig2);
        fixture.detectChanges();
        app.loginForm.controls['remember_me'].setValue(false);
        const event = new MockEvent();
        app.enter(event);
        expect(app).toBeTruthy();
    })
    it("should create the app and do login with failed result", () => {
        spyOn(localStorage, 'getItem').withArgs(LocalStorageType.RememberMe).and.returnValue(
            JSON.stringify({
                acc: 'id001',
                pass: 'pass001'
            })
        )
            .withArgs(LocalStorageType.UserInformation).and.returnValue(
                JSON.stringify({
                    acc: 'id001',
                    pass: 'pass001'
                })
            )
            .withArgs(LocalStorageType.LoginLanguage).and.returnValue(
                'en'
            )
        const fixture = TestBed.createComponent(LoginComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(app.route, 'navigate').and.callThrough();
        spyOn(app.authService, 'doLogin').and.returnValue(
            of(
                {
                    error_message: '04',
                    is_change_password: 1
                }
            )
        );
        spyOn(app.authService, 'getSideBarConfig').and.returnValue(MockLeftMenuConfig2);
        fixture.detectChanges();
        app.loginForm.controls['remember_me'].setValue(false);
        const event = new MockEvent();
        app.enter(event);
        expect(app).toBeTruthy();
    })
});