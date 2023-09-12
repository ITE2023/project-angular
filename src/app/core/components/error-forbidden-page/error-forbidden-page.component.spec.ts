import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { MockRouter } from 'src/app/shared/mockData/mockCommon';
import { MaterialModule } from 'src/app/shared/shared/material.module';

import { ErrorForbiddenPageComponent } from './error-forbidden-page.component';

describe('ErrorForbiddenPageComponent', () => {
  let component: ErrorForbiddenPageComponent;
  let fixture: ComponentFixture<ErrorForbiddenPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
      declarations: [ErrorForbiddenPageComponent],
      providers: [
        {
          provide: Router,
          useClass: MockRouter,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorForbiddenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigate to home page', () => {
    const fixture = TestBed.createComponent(ErrorForbiddenPageComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app, "navigateToHomePage").and.callThrough();
    app.navigateToHomePage();
    expect(app.navigateToHomePage).toHaveBeenCalled();
  });
});
