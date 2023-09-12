import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService, TransactionManager } from '@core/services';
import { TranslateModule, TranslateLoader, TranslateFakeLoader, TranslateService } from '@ngx-translate/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { mockDialogRef, MockEvent, MockTranslateService } from 'src/app/shared/mockData/mockCommon';
import { MockCommonService } from 'src/app/shared/mockData/mockCommonService';
import { MaterialModule } from 'src/app/shared/shared/material.module';

import { ImportFileDialogComponent } from './import-file-dialog.component';

describe('ImportFileDialogComponent', () => {
  let component: ImportFileDialogComponent;
  let fixture: ComponentFixture<ImportFileDialogComponent>;

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
      ],
      declarations: [ImportFileDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        {
          provide: CommonService,
          useClass: MockCommonService,
        },
        {
          provide: TranslateService,
          useClass: MockTranslateService,
        },
        TransactionManager,
        FormBuilder,
        ToastrService,
      ],
    }).compileComponents();
  }));

  it("click agree button with valid form, isPassword = false and call api succeed", () => {
    const fixture = TestBed.createComponent(ImportFileDialogComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    app.form.patchValue({
      type: '123',
      password: '123'
    });
    spyOn(app.transService, 'importFileIssuer').and.returnValue(
      of({
        error_code: '00'
      })
    )
    const eventSample = new MockEvent;
    // app.chooseDocument(eventSample);
    const blobSample = new Blob(["reughtrietiet"], { type: "pdf" });
    blobSample["lastModifiedDate"] = "";
    blobSample["name"] = "test1.pdf";
    eventSample.target.files = [
      blobSample
    ];
    app.onSelectFileDocument(eventSample);
    app.agree();
    expect(app).toBeTruthy();
    expect(app.f).toBeTruthy();
  });

  it("click agree button with valid form, isPassword = false and call api failed", () => {
    const fixture = TestBed.createComponent(ImportFileDialogComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    app.form.setValue({
      type: '123',
      file: '123',
      password: '123'
    });
    spyOn(app.transService, 'importFileIssuer').and.returnValue(
      of({
        error_code: '01'
      })
    )
    app.agree();
    expect(app).toBeTruthy();
    expect(app.f).toBeTruthy();
  });

  it("click agree button with valid form, isPassword = true and call api succeed", () => {
    const fixture = TestBed.createComponent(ImportFileDialogComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    app.form.setValue({
      type: '123',
      file: '123',
      password: '123'
    });
    app.changeType({ value: '1' });
    spyOn(app.transService, 'importFile').and.returnValue(
      of({
        error_code: '00'
      })
    )
    app.agree();
    expect(app).toBeTruthy();
    expect(app.f).toBeTruthy();
  });

  it("click agree button with invalid form", () => {
    const fixture = TestBed.createComponent(ImportFileDialogComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    app.agree();
    expect(app).toBeTruthy();
    expect(app.f).toBeTruthy();
  });

  it("click cancel button", () => {
    const fixture = TestBed.createComponent(ImportFileDialogComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    app.cancel();
    expect(app).toBeTruthy();
    expect(app.f).toBeTruthy();
  });

});
