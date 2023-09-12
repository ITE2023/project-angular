import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserInformationModel } from '@core/models';
import { BackgroundLoader, ProfileShare } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { MockActivatedRouteValue, mockDialogRef, MockProfileShare, MockRouter } from 'src/app/shared/mockData/mockCommon';
import { MatDialogMock } from 'src/app/shared/mockData/mockDialog';
import { MaterialModule } from 'src/app/shared/shared/material.module';
import { TopbarComponent } from './topbar.component';
describe('Topbar Component', () => {
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
                TopbarComponent,
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
                    provide: ProfileShare,
                    useClass: MockProfileShare,
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
        const fixture = TestBed.createComponent(TopbarComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(app.authService, "getUserInformation").and.returnValue(
            new UserInformationModel(
                "01",
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
            )
        );
        fixture.detectChanges();
        spyOn(app.authService, "logOut").and.returnValue(
            of(true)
        );
        app.userInformation = new UserInformationModel(
            "01",
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
        );
        app.changeLang('en');
        app.changeLang('vi');
        app.getLangSetting('en');
        app.redirectProfile();
        app.openChangePasswordModal();
        app.logOut();
        expect(app).toBeTruthy();
    });
});
