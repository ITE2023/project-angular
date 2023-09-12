import { async, TestBed } from "@angular/core/testing";
import {
  AgencyService,
  BackgroundLoader,
  CommonService,
  AuthenticationAndAuthorizationService,
  MerchantService,
  TransactionManager,
} from "@core/services";
import { of } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
  TranslateService,
} from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { MatDialogMock } from "src/app/shared/mockData/mockDialog";
import {
  MockActivatedRouteValue,
  MockActivatedRouteValueWithParam,
  MockRouterValue,
  MockTranslateService,
} from "src/app/shared/mockData/mockCommon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "src/app/shared/shared/material.module";
import { MockAuthService } from "src/app/shared/mockData/mockAuthService";
import { PaymentDetailComponent } from "./payment-detail.component";
import { MockTransactionPaymentList } from "src/app/shared/mockData/mockTransactionService";
import { UserInformationModel } from "@core/models";

export class MockAuthServiceFalse extends AuthenticationAndAuthorizationService {
  public checkPermission(key: string) {
      return false;
  }
  public getUserInformation() {
      return new UserInformationModel(
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          1
      )
  }
}

describe("PaymentDetailComponent", () => {
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
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        MaterialModule,
      ],
      declarations: [PaymentDetailComponent],
      providers: [
        {
          provide: TranslateService,
          useClass: MockTranslateService,
        },
        {
          provide: ActivatedRoute,
          useValue: MockActivatedRouteValueWithParam(
            of<any>(
                {
                    id: '30c273eaa27ab70a2ba6444bf440b10a',
                    get(att: string) {
                        return this.id
                    }
                }
            ),
            of<any>(undefined)
          ),
        },
        {
          provide: AuthenticationAndAuthorizationService,
          useClass: MockAuthService,
        },
        {
          provide: MatDialog,
          useClass: MatDialogMock,
        },
        {
          provide: Router,
          useValue: MockRouterValue(),
        },
        ToastrService,
        TransactionManager
      ],
    }).compileComponents();
  }));

  it("getDetailTransactionPayment success", () => {
    const fixture = TestBed.createComponent(PaymentDetailComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    spyOn(app.transactionService, 'getDetailTransactionPayment').and.returnValue(of({
      error_code: '00',
      data: MockTransactionPaymentList[0]
    }));
    app.getDetailTransactionPayment();
    expect(app).toBeTruthy();
  });

  it("getDetailTransactionPayment failed", () => {
    const fixture = TestBed.createComponent(PaymentDetailComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    spyOn(app.transactionService, 'getDetailTransactionPayment').and.returnValue(of({
      error_code: '01'
    }));
    app.getDetailTransactionPayment();
    expect(app).toBeTruthy();
  });

  it("open refund dialog", () => {
    const fixture = TestBed.createComponent(PaymentDetailComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    const dialogComponentInstance: any = {
    };
    spyOn(app.dialog, "open").and.returnValue({
      componentInstance: dialogComponentInstance,
      afterClosed: () => {
          return of(true)
      }
    })
    app.openRefund();
    expect(app).toBeTruthy();
  });
})

describe("Transaction Payment Detail Component with no permission", () => {
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
          ToastrModule.forRoot(),
          BrowserAnimationsModule,
          MaterialModule,
        ],
        declarations: [PaymentDetailComponent],
        providers: [
          {
            provide: TranslateService,
            useClass: MockTranslateService,
          },
          {
            provide: ActivatedRoute,
            useValue: MockActivatedRouteValueWithParam(
              of<any>(
                  {
                      id: '30c273eaa27ab70a2ba6444bf440b10a',
                      get(att: string) {
                          return this.id
                      }
                  }
              ),
              of<any>(undefined)
            ),
          },
          {
            provide: AuthenticationAndAuthorizationService,
            useClass: MockAuthServiceFalse,
          },
          {
            provide: MatDialog,
            useClass: MatDialogMock,
          },
          {
            provide: Router,
            useValue: MockRouterValue(),
          },
          ToastrService,
          TransactionManager
        ],
      }).compileComponents();

  }));
  it("should create the app with mock Transaction Payment Detail displayed", () => {
      const fixture = TestBed.createComponent(PaymentDetailComponent);
      const app = fixture.debugElement.componentInstance;
      fixture.detectChanges();
      expect(app).toBeTruthy();
  });
});

