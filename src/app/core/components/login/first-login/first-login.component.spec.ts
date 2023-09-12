import { async, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogMock } from 'src/app/shared/mockData/mockDialog';
import { mockDialogRef, MockEvent } from 'src/app/shared/mockData/mockCommon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BackgroundLoader } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/shared/material.module';
import { FirstLoginComponent } from './first-login.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { LocalStorageType } from '@core/constants';
describe("First Login Component", () => {
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
            declarations: [FirstLoginComponent],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: mockDialogRef,
                },
                BackgroundLoader,
                FormBuilder,
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

    it("should create the app ", () => {
        const fixture = TestBed.createComponent(FirstLoginComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(localStorage, 'getItem').and.returnValue('en');
        fixture.detectChanges();
        const event: any = {};
        event.keycode = 8;
        event.target = {
            value: 'abc123 '
        };
        app.checkValue(event);
        const eventEmpty: any = {};
        eventEmpty.keycode = 10;
        eventEmpty.target = {
            value: ' '
        };
        app.checkValue(eventEmpty);
        expect(app).toBeTruthy();
    })
    it("should change password successful", () => {
        const fixture = TestBed.createComponent(FirstLoginComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(app.profileService, 'updatePassword').and.returnValue(
            of({
                error_code: '00'
            })
        );
        spyOn(app.authService, 'logOut').and.returnValue(
            of({})
        )
        fixture.detectChanges();
        app.onUpdate();
        app.changePasswordForm.controls['currentPassword'].setValue('currentpassword');
        app.changePasswordForm.controls['password'].setValue('password');
        app.changePasswordForm.controls['confirmPassword'].setValue('password');
        app.onUpdate();
        app.errorList = {
            isMinValid: true,
            isUpper: true,
            isLower: true,
            isSpecial: true,
            isNumber: true,
            isUtf8: true,
        }
        app.onUpdate();
        expect(app).toBeTruthy();
    })
    it("should change password unsuccessful with wrong password", () => {
        const fixture = TestBed.createComponent(FirstLoginComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(localStorage, 'getItem').and.returnValue(undefined);
        spyOn(app.profileService, 'updatePassword').and.returnValue(
            of({
                error_code: '06'
            })
        );
        spyOn(app.authService, 'logOut').and.returnValue(
            of({})
        )
        fixture.detectChanges();
        app.changePasswordForm.controls['currentPassword'].setValue('currentpassword');
        app.changePasswordForm.controls['password'].setValue('password');
        app.changePasswordForm.controls['confirmPassword'].setValue('password');
        app.errorList = {
            isMinValid: true,
            isUpper: true,
            isLower: true,
            isSpecial: true,
            isNumber: true,
            isUtf8: true,
        }
        const event = {
            keyCode: 32,
            preventDefault() { }
        }
        app.onKeydown(event);
        app.onUpdate();
        expect(app).toBeTruthy();
    })
});