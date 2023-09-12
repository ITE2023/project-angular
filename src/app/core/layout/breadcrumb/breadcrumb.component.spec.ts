import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BREADCRUMB_CONFIG } from '@core/constants';
import { BackgroundLoader } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { MockActivatedRouteValue, MockRouter } from 'src/app/shared/mockData/mockCommon';
import { MaterialModule } from 'src/app/shared/shared/material.module';
import { BreadcrumbComponent } from './breadcrumb.component';


describe('BreadCrumbPageComponent', () => {
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
                BreadcrumbComponent,
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
                    provide: Router,
                    useClass: MockRouter,
                },
            ]
        }).compileComponents();
    }));

    it('should create', () => {
        const fixture = TestBed.createComponent(BreadcrumbComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        app.flatternArray(app.breadConfig, BREADCRUMB_CONFIG);
        app.getBreadCrumbArray('/admin/user/detail/231');
        expect(app).toBeTruthy();
    });
});
