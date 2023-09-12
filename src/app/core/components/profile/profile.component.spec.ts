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
import { BackgroundLoader, ProfileShare } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { MockActivatedRouteValue, mockDialogRef, MockRouter, MockProfileShare } from 'src/app/shared/mockData/mockCommon';
import { MatDialogMock } from 'src/app/shared/mockData/mockDialog';
import { MaterialModule } from 'src/app/shared/shared/material.module';
import { ProfileComponent } from './profile.component';


describe('Profile Component', () => {
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
                ProfileComponent,
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
                    provide: ProfileShare,
                    useClass: MockProfileShare,
                },
            ]
        }).compileComponents();
    }));

    it('should create', () => {
        spyOn(localStorage, "getItem")
            .withArgs(LocalStorageType.LoginLanguage).and.returnValue(undefined)
            .withArgs(LocalStorageType.DefaultLanguage).and.returnValue('{"id":"01"}')
            .withArgs(LocalStorageType.UserInformation).and.returnValue('{"id":"1911","userId":"95121C27-402E-F3D2-FE7A-C5BA9DD6AC15","userInformation":"Nguyễn Văn z","userName":"vnnnnnnnnz","pin":192,"displayName":"Nguyễn Văn z","email":"0anti.4mallu@bizybot.com","lastLoginDate":"2021-02-09T03:05:35.441Z","access_token":"eyJhbGciOiJIUzI1NiJ9.eyJpc0NoYW5nZVBhc3N3b3JkIjowLCJ1c2VyaWQiOjgsImlhdCI6MTYxMjg0MDAzOSwianRpIjoiRUYzMjNBQjUyQjNGMUEwRUVFODZDMzY3MkU2MEQ0MTciLCJleHBEYXRlIjoxNjEyODQyMTcwMDAwfQ.prRq_ouQZoISG5LZlFB-wrzUlMFW0e2KogariRy-XZQ","refresh_token":"A6752CEF-0BD4-E105-7BE2-4CC65080F9F4","token_type":"admin","expires_in":1192,"userRoles":["admin","normal"],"userRole":"Admin","listUserRoles":["admin","normal"],"listUserRoleIds":["1","2"],"isActive":true,"isSystemAdmin":true,"thumbnailPhoto":"http://35.223.25.100:8011/vtl-pg/aa/media/avatar/8-20201106102350.jpg","phone":"0321414123","is_change_password":0}');
        const fixture = TestBed.createComponent(ProfileComponent);
        const app = fixture.debugElement.componentInstance;
        spyOn(app.profileService, "detailProfile").and.returnValue(of({
            error_code: "00",
            data: {
                language: "vn"
            },
            avatar: "abcdef"
        }));
        spyOn(app.profileService, "getActivityHistory").and.returnValue(of({
            error_code: "00",
            error_message: "success",
            list_data: [],
            total_record: 20
        }));
        spyOn(app.userService, "getUserInformation").and.returnValue(new UserInformationModel(
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
        ));
        fixture.detectChanges();
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
        app.user = new UserInformationModel(
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
        app.editProfile();
        app.openChangeImg();
        app.openChangePasswordModal();
        app.seeMore();
        expect(app).toBeTruthy();
    });
});
