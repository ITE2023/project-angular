import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageType } from '@core/constants';
import { UserInformationModel } from '@core/models';
import { BackgroundLoader } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { MockLoginUserInfo } from 'src/app/shared/mockData/mockAuthService';
import { MockActivatedRouteValue, mockDialogRef, MockRouter, MockEvent } from 'src/app/shared/mockData/mockCommon';
import { MatDialogMock } from 'src/app/shared/mockData/mockDialog';
import { MaterialModule } from 'src/app/shared/shared/material.module';
import { ProfileModalComponent } from './profile-modal.component';

describe('Profile Modal Component', () => {
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
                ProfileModalComponent,
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
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: { profile: MockLoginUserInfo, langs: ['vi', 'en'] },
                },
            ]
        }).compileComponents();
    }));

    it('should create', () => {
        spyOn(localStorage, 'getItem').withArgs(LocalStorageType.UserInformation).and.returnValue(
            JSON.stringify(new UserInformationModel(
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                1
            ))
        );
        const fixture = TestBed.createComponent(ProfileModalComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(app.profileService, "updateProfile").and.returnValue(
            of({
                error_code: '00',
                error_message: 'success'
            })
        )
        fixture.detectChanges();
        app.getUserInformation();
        const event = new MockEvent();
        app.enter(event);
        expect(app).toBeTruthy();
    });
});
