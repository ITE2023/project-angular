import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TransactionManager } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader, TranslateService } from '@ngx-translate/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { MockTranslateService, MockRouter, mockDialogRef } from 'src/app/shared/mockData/mockCommon';
import { MatDialogMock } from 'src/app/shared/mockData/mockDialog';
import { MaterialModule } from 'src/app/shared/shared/material.module';

import { UpdateStatusConfirmDialogComponent } from './update-status-confirm-dialog.component';

describe('UpdateStatusConfirmDialogComponent', () => {
  let component: UpdateStatusConfirmDialogComponent;
  let fixture: ComponentFixture<UpdateStatusConfirmDialogComponent>;

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
      declarations: [UpdateStatusConfirmDialogComponent],
      providers: [
        FormBuilder,
        {
          provide: MatDialogRef,
          useValue: mockDialogRef
        },
        {
          provide: TranslateService,
          useClass: MockTranslateService,
        },
        TransactionManager,
        ToastrService
      ],
    }).compileComponents();
  }));

  it("click agree button with valid form", () => {
    const fixture = TestBed.createComponent(UpdateStatusConfirmDialogComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    app.data = {
      password: ''
    };
    app.f.password.setValue('123');
    spyOn(app.transactionService, 'updateTransactionStatus').and.returnValue(
      of({
          error_code: '00'
      })
  )
    app.agree();
    expect(app).toBeTruthy();
    expect(app.f).toBeTruthy();
  });

  it("click cancel button", () => {
    const fixture = TestBed.createComponent(UpdateStatusConfirmDialogComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    app.cancel();
    expect(app).toBeTruthy();
    expect(app.f).toBeTruthy();
  });

  it("click agree button with invalid form", () => {
    const fixture = TestBed.createComponent(UpdateStatusConfirmDialogComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    app.data = {
      password: ''
    };
    app.f.password.setValue(null);
    app.agree();
    expect(app).toBeTruthy();
    expect(app.f).toBeTruthy();
  });

  it("click agree button but call api failed", () => {
    const fixture = TestBed.createComponent(UpdateStatusConfirmDialogComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    app.data = {
      password: ''
    };
    app.f.password.setValue('123');
    spyOn(app.transactionService, 'updateTransactionStatus').and.returnValue(
      of({
          error_code: '01'
      })
  )
    app.agree();
    expect(app).toBeTruthy();
    expect(app.f).toBeTruthy();
  });
});
