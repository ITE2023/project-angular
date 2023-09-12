import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BackgroundLoader } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { MockActivatedRouteValue, mockDialogRef, MockRouter, MockEvent } from 'src/app/shared/mockData/mockCommon';
import { MatDialogMock } from 'src/app/shared/mockData/mockDialog';
import { MaterialModule } from 'src/app/shared/shared/material.module';
import { ChangePasswordComponent } from './change-password.component';

describe('ChangePasswordModalComponent', () => {
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
                ChangePasswordComponent,
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
        const fixture = TestBed.createComponent(ChangePasswordComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(app.profileService, 'updatePassword').and.returnValue(of({
            error_code: '00'
        }));
        fixture.detectChanges();
        app.onUpdate();
        app.f.password.setValue('12434aB@');
        app.f.confirmPassword.setValue('12434aB@');
        app.f.currentPassword.setValue('124346');
        app.onUpdate();
        app.checkValue({
            keycode: 8,
            target: {
                value: 'abcd232AQRef@bc'
            }
        })
        app.onUpdate();
        app.checkValue({
            keycode: 8,
            target: {
                value: '  '
            }
        });
        app.onNoClick();
        const event = new MockEvent();
        event.keyCode = 32;
        app.onKeydown(event);
        expect(app).toBeTruthy();
    });
    it('should create', () => {
        const fixture = TestBed.createComponent(ChangePasswordComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(app.profileService, 'updatePassword').and.returnValue(of({
            error_code: '06'
        }));
        fixture.detectChanges();
        app.onUpdate();
        app.f.password.setValue('12434aB@');
        app.f.confirmPassword.setValue('12434aB@');
        app.f.currentPassword.setValue('124346');
        app.onUpdate();
        app.checkValue({
            keycode: 8,
            target: {
                value: 'abcd232AQRef@bc'
            }
        })
        app.onUpdate();
        expect(app).toBeTruthy();
    });
    it('should create', () => {
        const fixture = TestBed.createComponent(ChangePasswordComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(app.profileService, 'updatePassword').and.returnValue(of({
            error_code: '01'
        }));
        fixture.detectChanges();
        app.onUpdate();
        app.f.password.setValue('12434aB@');
        app.f.confirmPassword.setValue('12434aB@');
        app.f.currentPassword.setValue('124346');
        app.onUpdate();
        app.checkValue({
            keycode: 8,
            target: {
                value: 'abcd232AQRef@bc'
            }
        })
        app.onUpdate();
        expect(app).toBeTruthy();
    });
});
