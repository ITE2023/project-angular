import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBrowserAndLocationInformationService } from '@core/app/app.component.spec';
import { UserInformationModel } from '@core/models';
import { BackgroundLoader, BrowserAndLocationInformationService } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { MockUserInfo } from 'src/app/shared/mockData/mockAuthService';
import { MockActivatedRouteValue, mockDialogRef, MockRouter, MockEvent } from 'src/app/shared/mockData/mockCommon';
import { MatDialogMock } from 'src/app/shared/mockData/mockDialog';
import { MaterialModule } from 'src/app/shared/shared/material.module';
import { ChangeAvatarModalComponent } from './change-avatar-modal.component';



describe('ChangeAvatarModalComponent', () => {
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
                ChangeAvatarModalComponent,
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
                    provide: BrowserAndLocationInformationService,
                    useClass: MockBrowserAndLocationInformationService,
                }
            ]
        }).compileComponents();
    }));

    it('should create', () => {
        const fixture = TestBed.createComponent(ChangeAvatarModalComponent);
        const app = fixture.debugElement.componentInstance;
        app.userInfo = new UserInformationModel(
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
        );
        fixture.detectChanges();
        const event = new MockEvent();
        const blob = new Blob(["reughtrietiet"], { type: "pdf" });
        blob["lastModifiedDate"] = "";
        blob["name"] = "test1.jpg";
        event.target.files = [
            blob
        ]
        app.onSelectFile(event);
        // const event1 = new MockEvent();
        // const blob1 = new Blob(["reughtrietiet"], { type: "pdf" });
        // blob1["lastModifiedDate"] = "";
        // blob1["name"] = "test1.pdf";
        // event1.target.files = [
        //     blob
        // ]
        // app.onSelectFile(event1);
        app.onNoClick();
        app.cancel();
        spyOn(app.userService, "changeAvatar").and.returnValue(
            of({
                error_code: "00"
            })
        );
        spyOn(app.authService, "getUserInformation").and.returnValue(
            MockUserInfo
        );
        app.saveAvatar();
        expect(app).toBeTruthy();
    });
    it('should create and excute with error', () => {
        const fixture = TestBed.createComponent(ChangeAvatarModalComponent);
        const app = fixture.debugElement.componentInstance;
        // app.userInfo = new UserInformationModel(
        //     undefined,
        //     undefined,
        //     undefined,
        //     undefined,
        //     undefined,
        //     undefined,
        //     undefined,
        //     undefined,
        //     undefined,
        //     undefined,
        //     undefined,
        //     undefined,
        //     undefined,
        //     undefined,
        //     undefined,
        //     undefined,
        //     undefined,
        //     undefined,
        //     undefined,
        //     undefined,
        //     undefined,
        //     undefined,
        //     undefined,
        //     undefined,
        //     true
        // );
        fixture.detectChanges();
        const event = new MockEvent();
        app.onSelectFile(event);
        const blob = new Blob(["reughtrietiet"], { type: "pdf" });
        blob["lastModifiedDate"] = "";
        blob["name"] = "test1.pdf";
        event.target.files = [
            blob
        ]
        app.onSelectFile(event);
        app.imageFileValidate({ name: 'file.jpeg', size: 12034823948394 });
        expect(app).toBeTruthy();
    });
});
