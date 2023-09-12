import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateModule, TranslateLoader, TranslateFakeLoader, TranslateService } from '@ngx-translate/core';
import { mockDialogRef, MockTranslateService } from 'src/app/shared/mockData/mockCommon';
import { MatDialogMock } from 'src/app/shared/mockData/mockDialog';
import { MaterialModule } from 'src/app/shared/shared/material.module';
import { UpdateStatusConfirmDialogComponent } from '../update-status-confirm-dialog/update-status-confirm-dialog.component';

import { UpdateStatusDialogComponent } from './update-status-dialog.component';

describe('UpdateStatusDialogComponent', () => {
  let component: UpdateStatusDialogComponent;
  let fixture: ComponentFixture<UpdateStatusDialogComponent>;

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
      ],
      declarations: [UpdateStatusDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        {
          provide: TranslateService,
          useClass: MockTranslateService,
      },
      {
        provide: MatDialog,
        useClass: MatDialogMock,
    },
        FormBuilder,
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  }));

  it("submit form with valid form", () => {
    const fixture = TestBed.createComponent(UpdateStatusDialogComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    app.form.setValue({
      status_code: '123',
      txn_reference: '123',
      txn_certificate: '123',
      txn_desc: '123',
    });
    app.onSubmit();
    app.dialog.open(UpdateStatusConfirmDialogComponent);
    expect(app).toBeTruthy();
    expect(app.f).toBeTruthy();
  });

  it("submit form with invalid form", () => {
    const fixture = TestBed.createComponent(UpdateStatusDialogComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    app.onSubmit();
    expect(app).toBeTruthy();
    expect(app.f).toBeTruthy();
  });

  it("click cancel button", () => {
    const fixture = TestBed.createComponent(UpdateStatusDialogComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    app.cancel();
    expect(app).toBeTruthy();
    expect(app.f).toBeTruthy();
  });
});
