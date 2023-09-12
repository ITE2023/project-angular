import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TransactionManager } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader, TranslateService } from '@ngx-translate/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { mockDialogRef, MockTranslateService } from 'src/app/shared/mockData/mockCommon';
import { MaterialModule } from 'src/app/shared/shared/material.module';

import { ChangeStatusComponent } from './change-status.component';

describe('ChangeStatusComponent', () => {
  let component: ChangeStatusComponent;
  let fixture: ComponentFixture<ChangeStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
            deps: [HttpClient],
          },
        }),
        BrowserAnimationsModule,
        MaterialModule,
      ],
      declarations: [ChangeStatusComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef
        },
        {
          provide: TranslateService,
          useClass: MockTranslateService,
        },
        TransactionManager,
        ToastrService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  }));

  it("click agree button with invalid form and call api succeed", () => {
    const fixture = TestBed.createComponent(ChangeStatusComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    app.data.id = 123;
    spyOn(app.transactionService, 'updateTransactionStatusIssuer').and.returnValue(
      of({
        error_code: '00'
      })
    )
    app.agree();
    expect(app).toBeTruthy();
  });

  it("click agree button with invalid form and call api failed", () => {
    const fixture = TestBed.createComponent(ChangeStatusComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    spyOn(app.transactionService, 'updateTransactionStatusIssuer').and.returnValue(
      of({
        error_code: '01'
      })
    )
    app.agree();
    expect(app).toBeTruthy();
  });

  it("click cancel button", () => {
    const fixture = TestBed.createComponent(ChangeStatusComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    app.cancel();
    expect(app).toBeTruthy();
  });
});
