import { MockAuthService } from "src/app/shared/mockData/mockAuthService";
import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import {
  TranslateService,
  TranslateStore,
  TranslateLoader,
  TranslateCompiler,
  TranslateParser,
  MissingTranslationHandler,
  TranslateModule,
  USE_DEFAULT_LANG,
  USE_STORE,
  USE_EXTEND,
  DEFAULT_LANGUAGE,
  TranslateFakeLoader,
} from "@ngx-translate/core";
import { HttpClient, HttpHandler } from "@angular/common/http";
import {
  BrowserAndLocationInformationService,
  AuthenticationAndAuthorizationService,
} from "@core/services";
import { DeviceDetectorService } from "ngx-device-detector";
import { Title } from "@angular/platform-browser";
import { MatDialogModule, MatDialog } from "@angular/material/dialog";
import { Overlay } from "@angular/cdk/overlay";
import { Router, NavigationEnd } from "@angular/router";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatDialogHarness } from "@angular/material/dialog/testing";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { MaterialModule } from "src/app/shared/shared/material.module";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const browserInfo = {};
export class MdDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {};
  }
}
@Injectable()
export class MockBrowserAndLocationInformationService extends BrowserAndLocationInformationService {
  getInfo() {
    return browserInfo;
  }
}
class MockRouter {
  public ne = new NavigationEnd(
    0,
    "/pdp/project-details/4/edit",
    "/pdp/project-details/4/edit"
  );
  public events = new Observable((observer) => {
    observer.next(this.ne);
    observer.complete();
  });
}

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
      ],
      declarations: [AppComponent],
      providers: [
        { provide: USE_DEFAULT_LANG, useValue: "vi" },
        TranslateService,
        TranslateStore,
        TranslateLoader,
        TranslateCompiler,
        TranslateParser,
        MissingTranslationHandler,
        DeviceDetectorService,
        {
          provide: TranslateLoader,
          useClass: TranslateFakeLoader,
        },
        { provide: USE_STORE, useValue: false },
        { provide: USE_EXTEND, useValue: false },
        { provide: DEFAULT_LANGUAGE, useValue: true },
        {
          provide: BrowserAndLocationInformationService,
          useClass: MockBrowserAndLocationInformationService,
        },
        {
          provide: AuthenticationAndAuthorizationService,
          useClass: MockAuthService,
        },
        {
          provide: Router,
          // useClass: class { navigate = jasmine.createSpy("navigate"); },
          useClass: MockRouter,
        },
        {
          provide: MatDialog,
          useClass: MatDialogHarness,
        },
      ],
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  it("should make change in oninit", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    // expect(window.scrollTo(0, 0)).toHaveBeenCalled();
    expect(app).toBeTruthy();
  });
});
