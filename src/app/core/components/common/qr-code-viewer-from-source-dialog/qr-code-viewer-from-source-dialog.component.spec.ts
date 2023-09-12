
import { async, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogMock } from 'src/app/shared/mockData/mockDialog';
import { mockDialogRef } from 'src/app/shared/mockData/mockCommon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BackgroundLoader } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/shared/material.module';
import { QrCodeViewerFromSourceDialogComponent } from './qr-code-viewer-from-source-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe("QR Code Viewer From Source Component", () => {
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
            declarations: [QrCodeViewerFromSourceDialogComponent],
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
        const fixture = TestBed.createComponent(QrCodeViewerFromSourceDialogComponent);
        const app = fixture.debugElement.componentInstance;
        // const blobSamplePdf = new Blob(["reughtrietiet"], { type: "pdf" });
        // blobSamplePdf["lastModifiedDate"] = "";
        // blobSamplePdf["name"] = "test1.pdf";
        // app.docFile = blobSamplePdf
        app.imageUrl = 'http://35.223.25.100:8003/vtl-pg-qr/view/1596680151690910711';
        // app.imageUrlStatus = false;
        fixture.detectChanges();
        app.download();
        app.copyURL();
        app.cancel();
        expect(app).toBeTruthy();
    })
});