import { DocumentViewerComponent } from "./document-viewer.component";
import { async, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogMock } from 'src/app/shared/mockData/mockDialog';
import { mockDialogRef } from 'src/app/shared/mockData/mockCommon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BackgroundLoader } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/shared/material.module';

describe("Document Viewer Component", () => {
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
                // ToastrModule.forRoot(),
                // BrowserAnimationsModule,
            ],
            declarations: [DocumentViewerComponent],
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

    it("should create the app ", () => {
        const fixture = TestBed.createComponent(DocumentViewerComponent);
        const app = fixture.debugElement.componentInstance;
        const blobSamplePdf = new Blob(["reughtrietiet"], { type: "pdf" });
        blobSamplePdf["lastModifiedDate"] = "";
        blobSamplePdf["name"] = "test1.pdf";
        app.docFile = blobSamplePdf
        fixture.detectChanges();
        app.changeError();
        app.close();
        expect(app).toBeTruthy();
    })
    it("should create the app with doc url", () => {
        const fixture = TestBed.createComponent(DocumentViewerComponent);
        const app = fixture.debugElement.componentInstance;

        app.docFile = undefined;
        fixture.detectChanges();
        app.changeError();
        app.close();
        expect(app).toBeTruthy();
    })
    it("should create the app with image", () => {
        const fixture = TestBed.createComponent(DocumentViewerComponent);
        const app = fixture.debugElement.componentInstance;
        const blobSamplePng = new Blob(["reughtrietiet"], { type: "image/png" });
        blobSamplePng["lastModifiedDate"] = "";
        blobSamplePng["name"] = "test1.png";
        app.docFile = blobSamplePng
        fixture.detectChanges();
        expect(app).toBeTruthy();
    })
});