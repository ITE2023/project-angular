import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageType } from '@core/constants';
import { BackgroundLoader } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { MockActivatedRouteValue, mockDialogRef, MockRouter } from 'src/app/shared/mockData/mockCommon';
import { MatDialogMock } from 'src/app/shared/mockData/mockDialog';
import { MaterialModule } from 'src/app/shared/shared/material.module';
import { ResetPasswordComponent } from './reset-password.component';


describe('Reset Password Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useClass: TranslateFakeLoader,
                        deps: [HttpClient]
                    }
                }),
                ToastrModule.forRoot(),
                BrowserAnimationsModule,
                MaterialModule,
                BsDatepickerModule.forRoot(),
                NgxMatSelectSearchModule
            ],
            declarations: [
                ResetPasswordComponent,
            ],
            providers: [

                FormBuilder,
                BackgroundLoader,
                ToastrService,
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {}
                },
                {
                    provide: ActivatedRoute,
                    useValue: MockActivatedRouteValue(
                        of<any>({
                            status: 'success',
                            get(att: string) {
                                return this.status
                            }
                        }),
                        of<any>({
                            page: 1,
                            size: 10,
                        })
                    ),
                },
                {
                    provide: MatDialog,
                    useClass: MatDialogMock,
                },
                {
                    provide: MatDialogRef,
                    useValue: mockDialogRef,
                },
                {
                    provide: Router,
                    useClass: MockRouter,
                },
            ]
        }).compileComponents();
    }));

    it('should create', () => {
        const fixture = TestBed.createComponent(ResetPasswordComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(localStorage, "getItem").withArgs(LocalStorageType.OTP).and.returnValue(
            JSON.stringify(
                {
                    email: "pls@gmail.com"
                }
            )
        )
        spyOn(app.profileService, "confirmResetPws").and.returnValue(
            of({
                error_code: "00",
                ref_id: '12434'
            })
        )
        spyOn(app.profileService, "confirmNewPassWord").and.returnValue(
            of({
                error_code: "00",
                ref_id: '12434'
            })
        )
        fixture.detectChanges();
        app.getOTP();
        app.updateNewPasswords();
        app.f.new_password.setValue('12434aB@');
        app.f.confirm_password.setValue('12434aB@');
        app.f.otp.setValue('124346');
        app.updateNewPasswords();
        app.checkValue({
            keycode: 8,
            target: {
                value: 'abcd232AQRef@bc'
            }
        })
        app.updateNewPasswords();
        expect(app).toBeTruthy();
    });
    it('should create', () => {
        const fixture = TestBed.createComponent(ResetPasswordComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(localStorage, "getItem").withArgs(LocalStorageType.OTP).and.returnValue(
            JSON.stringify(
                {
                    email: "pls@gmail.com"
                }
            )
        )
        spyOn(app.profileService, "confirmResetPws").and.returnValue(
            of({
                error_code: "00",
                ref_id: '12434'
            })
        )
        spyOn(app.profileService, "confirmNewPassWord").and.returnValue(
            of({
                error_code: "01",
                ref_id: '12434'
            })
        )
        fixture.detectChanges();
        app.getOTP();
        app.updateNewPasswords();
        app.f.new_password.setValue('12434aB@');
        app.f.confirm_password.setValue('12434aB@');
        app.f.otp.setValue('124346');
        app.updateNewPasswords();
        app.checkValue({
            keycode: 8,
            target: {
                value: 'abcd232AQRef@bc'
            }
        })
        app.updateNewPasswords();
        app.clearForm();
        app.getLangSetting('en');
        expect(app).toBeTruthy();
    });
    it('should create with error 11', () => {
        const fixture = TestBed.createComponent(ResetPasswordComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(localStorage, "getItem").withArgs(LocalStorageType.OTP).and.returnValue(
            JSON.stringify(
                {
                    email: "pls@gmail.com"
                }
            )
        )
        spyOn(app.profileService, "confirmResetPws").and.returnValue(
            of({
                error_code: "11",
                ref_id: '12434'
            })
        )
        fixture.detectChanges();
        app.getOTP();
        app.checkValue({
            keycode: 8,
            target: {
                value: 'abcdef@bc'
            }
        })
        app.checkValue({
            keycode: 8,
            target: {
                value: ''
            }
        })
        expect(app).toBeTruthy();
    });
    it('should create with error other', () => {
        const fixture = TestBed.createComponent(ResetPasswordComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(localStorage, "getItem").withArgs(LocalStorageType.OTP).and.returnValue(
            JSON.stringify(
                {
                    email: "pls@gmail.com"
                }
            )
        )
        spyOn(app.profileService, "confirmResetPws").and.returnValue(
            of({
                error_code: "01",
                ref_id: '12434'
            })
        )
        fixture.detectChanges();
        app.getOTP();
        expect(app).toBeTruthy();
    });
});
