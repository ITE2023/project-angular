
import { async, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogMock } from 'src/app/shared/mockData/mockDialog';
import { mockDialogRef } from 'src/app/shared/mockData/mockCommon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BackgroundLoader } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/shared/material.module';
import { ToastrModule } from 'ngx-toastr';
import { PaginationComponent } from './pagination.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe("Pagination Component", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                // RouterTestingModule,
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
            declarations: [PaginationComponent],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: mockDialogRef,
                },
                BackgroundLoader,
                // FormBuilder,
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
    it("should create the app  with 1 page amount", () => {
        const fixture = TestBed.createComponent(PaginationComponent);
        const app = fixture.debugElement.componentInstance;
        app.total = 5;
        app.page = 1;
        app.pageSize = 10;
        app.loading = false;
        fixture.detectChanges();
        app.ngOnChanges();
        expect(app).toBeTruthy();
    })
    it("should create the app  with 2 page amount", () => {
        const fixture = TestBed.createComponent(PaginationComponent);
        const app = fixture.debugElement.componentInstance;
        app.total = 14;
        app.page = 1;
        app.pageSize = 10;
        app.loading = false;
        fixture.detectChanges();
        app.ngOnChanges();
        expect(app).toBeTruthy();
    })
    it("should create the app  with 3 page amount", () => {
        const fixture = TestBed.createComponent(PaginationComponent);
        const app = fixture.debugElement.componentInstance;
        app.total = 23;
        app.page = 2;
        app.pageSize = 10;
        app.loading = false;
        fixture.detectChanges();
        app.ngOnChanges();
        expect(app).toBeTruthy();
    })
    it("should create the app  with 4 page amount", () => {
        const fixture = TestBed.createComponent(PaginationComponent);
        const app = fixture.debugElement.componentInstance;
        app.total = 34;
        app.page = 2;
        app.pageSize = 10;
        app.loading = false;
        fixture.detectChanges();
        app.ngOnChanges();
        expect(app).toBeTruthy();
    })

    it("should create the app  with 5 page amount", () => {
        const fixture = TestBed.createComponent(PaginationComponent);
        const app = fixture.debugElement.componentInstance;
        app.total = 50;
        app.page = 2;
        app.pageSize = 10;
        app.loading = false;
        fixture.detectChanges();
        app.ngOnChanges();
        expect(app).toBeTruthy();
    })
    it("should create the app  with more than 5 page amount and page 1", () => {
        const fixture = TestBed.createComponent(PaginationComponent);
        const app = fixture.debugElement.componentInstance;
        app.total = 55;
        app.page = 1;
        app.pageSize = 10;
        app.loading = false;
        fixture.detectChanges();
        app.ngOnChanges();
        app.move('previous');
        expect(app).toBeTruthy();
    })
    it("should create the app  with more than 5 page amount and page 2", () => {
        const fixture = TestBed.createComponent(PaginationComponent);
        const app = fixture.debugElement.componentInstance;
        app.total = 55;
        app.page = 2;
        app.pageSize = 10;
        app.loading = false;
        fixture.detectChanges();
        app.ngOnChanges();
        expect(app).toBeTruthy();
    })
    it("should create the app  with more than 5 page amount and page 3", () => {
        const fixture = TestBed.createComponent(PaginationComponent);
        const app = fixture.debugElement.componentInstance;
        app.total = 55;
        app.page = 3;
        app.pageSize = 10;
        app.loading = false;
        fixture.detectChanges();
        app.ngOnChanges();
        expect(app).toBeTruthy();
    })
    it("should create the app  with more than 5 page amount and page equals total page -2", () => {
        const fixture = TestBed.createComponent(PaginationComponent);
        const app = fixture.debugElement.componentInstance;
        app.total = 75;
        app.page = 6;
        app.pageSize = 10;
        app.loading = false;
        fixture.detectChanges();
        app.ngOnChanges();
        expect(app).toBeTruthy();
    })
    it("should create the app  with more than 5 page amount and page equals total page -1", () => {
        const fixture = TestBed.createComponent(PaginationComponent);
        const app = fixture.debugElement.componentInstance;
        app.total = 75;
        app.page = 7;
        app.pageSize = 10;
        app.loading = false;
        fixture.detectChanges();
        app.ngOnChanges();
        expect(app).toBeTruthy();
    })
    it("should create the app  with more than 5 page and and page equals total page", () => {
        const fixture = TestBed.createComponent(PaginationComponent);
        const app = fixture.debugElement.componentInstance;
        app.pageSizeConfig = [5, 10, 20, 30]
        app.total = 75;
        app.page = 8;
        app.pageSize = 10;
        app.loading = false;
        fixture.detectChanges();
        app.ngOnChanges();
        app.move('next');
        expect(app).toBeTruthy();
    })
    it("should create the app  with more than 5 page amount", () => {
        const fixture = TestBed.createComponent(PaginationComponent);
        const app = fixture.debugElement.componentInstance;
        app.total = 75;
        app.page = 4;
        app.pageSize = 10;
        app.loading = false;
        fixture.detectChanges();
        app.ngOnChanges();
        app.changePage({ value: 5, active: true });
        app.onPageSizeChange({ value: 20 });
        app.move('previous');
        app.move('next');
        app.move('first');
        app.move('last');
        expect(app).toBeTruthy();
    })
});