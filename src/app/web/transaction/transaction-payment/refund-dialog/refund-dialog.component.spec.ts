import { TestBed, async } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
  TranslateService,
} from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  mockDialogRef,
  MockTranslateService,
  MockEvent,
} from "src/app/shared/mockData/mockCommon";
import {
  BackgroundLoader,
  CommonService,
  TransactionManager,
  UnitManagementService,
} from "@core/services";
import { FormBuilder } from "@angular/forms";
import { MockRole } from "src/app/shared/mockData/mockCommonService";
import { of } from "rxjs";
import { MaterialModule } from "src/app/shared/shared/material.module";
import { MockCentreList, MockCentreStatusListBox } from "src/app/shared/mockData/mockUnitService";
import { RefundDialogComponent } from "./refund-dialog.component";
import { MatDialogMock } from "src/app/shared/mockData/mockDialog";
import { MockRefundReason } from "src/app/shared/mockData/mockTransactionService";

describe("Refund dialog", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
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
      declarations: [RefundDialogComponent],
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
        FormBuilder,
        ToastrService,
        CommonService,
        {
          provide: TranslateService,
          useClass: MockTranslateService,
        },
        TransactionManager
      ],
    }).compileComponents();

  }));
  it("refund success", () => {
    const fixture = TestBed.createComponent(RefundDialogComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.commonService, 'GetListBoxData').withArgs('refund_reason').and.returnValue(of({
      error_code: '00',
      list_data: MockRefundReason
    }))
    spyOn(app.transaction, 'refund').and.returnValue(of({
      error_code: '00'
    }))
    fixture.detectChanges();
    app.onChangeShowInput({value: 'other'});
    app.f['amount'].setValue('100000');
    app.f['reason'].setValue('other');
    app.f['contentReason'].setValue('abc');
    app.onSubmit();
    expect(app).toBeTruthy();
    expect(app.f).toBeTruthy();
  });
  it("refund failed", () => {
    const fixture = TestBed.createComponent(RefundDialogComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.commonService, 'GetListBoxData').withArgs('refund_reason').and.returnValue(of({
      error_code: '00',
      list_data: MockRefundReason
    }))
    spyOn(app.transaction, 'refund').and.returnValue(of({
      error_code: '01',
    }))
    app.data.available_refund_amount = 9000000;
    app.data.merchantId = 123;
    app.data.id = 1;
    fixture.detectChanges();
    app.onChangeShowInput({value: 'other'});
    app.f['amount'].setValue('10000');
    app.f['reason'].setValue('other');
    app.f['contentReason'].setValue('abc');
    expect(app).toBeTruthy();
    expect(app.f).toBeTruthy();
  });
  it("cancel", () => {
    const fixture = TestBed.createComponent(RefundDialogComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.commonService, 'GetListBoxData').withArgs('refund_reason').and.returnValue(of({
      error_code: '00',
      list_data: MockRefundReason
    }))
    fixture.detectChanges();
    app.cancel();
    expect(app).toBeTruthy();
    expect(app.f).toBeTruthy();
  });
  it("invalid form", () => {
    const fixture = TestBed.createComponent(RefundDialogComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.commonService, 'GetListBoxData').withArgs('refund_reason').and.returnValue(of({
      error_code: '00',
      list_data: MockRefundReason
    }))
    fixture.detectChanges();
    app.onChangeShowInput({value: 'error_product'});
    app.f['amount'].setValue(0);
    app.f['reason'].setValue('error_product');
    app.onSubmit();
    expect(app).toBeTruthy();
    expect(app.f).toBeTruthy();
  });
});



