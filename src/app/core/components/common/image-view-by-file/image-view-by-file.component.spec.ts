
import { async, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogMock } from 'src/app/shared/mockData/mockDialog';
import { mockDialogRef } from 'src/app/shared/mockData/mockCommon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BackgroundLoader } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/shared/material.module';
import { ImageViewByFileComponent } from './image-view-by-file.component';

describe("Image View By File Component", () => {
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
            declarations: [ImageViewByFileComponent],
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
        const fixture = TestBed.createComponent(ImageViewByFileComponent);
        const app = fixture.debugElement.componentInstance;
        const blobSampleJpeg = new Blob(["reughtrietiet"], { type: "image/jpeg" });
        blobSampleJpeg["lastModifiedDate"] = "";
        blobSampleJpeg["name"] = "test1.jpeg";
        app.imageFile = blobSampleJpeg
        fixture.detectChanges();
        app.close();
        expect(app).toBeTruthy();
    })

});