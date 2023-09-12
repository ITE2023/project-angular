import { TestBed, async } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {
    TranslateModule,
    TranslateLoader,
    TranslateFakeLoader,
    TranslateService,
} from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
    mockDialogRef,
    MockCentreListBox,
    MockTranslateService,
} from "src/app/shared/mockData/mockCommon";
import {
    DropdownDataService,
    UnitManagementService,
} from "@core/services";
import { of } from "rxjs";
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "src/app/shared/shared/material.module";
import { MockCentreList } from "src/app/shared/mockData/mockUnitService";
import { RefundResultDialogComponent } from "./refund-result-dialog.component";
import { MatDialogMock } from "src/app/shared/mockData/mockDialog";
export class MockDropDownService extends DropdownDataService {
    public getDropdownData(key: string) {
        return of({
            error_code: '00',
            list_data: MockCentreListBox
        })
    }
}

describe("refund result Dialog Component", () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes(
                    [

                    ]
                ),
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
            declarations: [RefundResultDialogComponent],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: mockDialogRef,
                },
                {
                  provide: MatDialog,
                  useClass: MatDialogMock,
              },
              { provide: MAT_DIALOG_DATA, useValue: {} },
            ],
        }).compileComponents();

    }));
    it("view refund result", () => {
        const fixture = TestBed.createComponent(RefundResultDialogComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        app.cancel();
        expect(app).toBeTruthy();
    });
});



