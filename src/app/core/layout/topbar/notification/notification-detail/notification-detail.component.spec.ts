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
import { MatDialog } from "@angular/material/dialog";
import {
  MockTranslateService,
  MockRouter,
  MockActivatedRouteValue,
} from "src/app/shared/mockData/mockCommon";
import {
  CommonService,
  AuthenticationAndAuthorizationService,
  NotificationService,
} from "@core/services";
import { FormBuilder } from "@angular/forms";
import { MockCommonService } from "src/app/shared/mockData/mockCommonService";
import { of } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogMock } from "src/app/shared/mockData/mockDialog";
import { MaterialModule } from "src/app/shared/shared/material.module";
import { PaginationComponent } from "@core/components/pagination/pagination.component";
import { MockAuthService } from "src/app/shared/mockData/mockAuthService";
import { BsDatepickerModule } from "ngx-bootstrap";
import { NotificationDetailComponent } from "./notification-detail.component";

describe("NotificationDetailComponent", () => {
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
        BsDatepickerModule.forRoot(),
      ],
      declarations: [NotificationDetailComponent, PaginationComponent],
      providers: [
        {
          provide: CommonService,
          useClass: MockCommonService,
        },
        FormBuilder,
        ToastrService,
        {
          provide: ActivatedRoute,
          useValue: MockActivatedRouteValue(
            of<any>({
              status: 'success',
              get(att: string) {
                  return this.status
              }
          }),
            of<any>({
              page: 1,
              size: 10,
            })
          ),
        },
        {
          provide: AuthenticationAndAuthorizationService,
          useClass: MockAuthService,
        },
        {
          provide: Router,
          useClass: MockRouter,
        },
        CommonService,
        {
          provide: TranslateService,
          useClass: MockTranslateService,
        },
        {
          provide: MatDialog,
          useClass: MatDialogMock,
        },
        NotificationService,
        Location
      ],
    }).compileComponents();
  }));
  it("get list", () => {
    const fixture = TestBed.createComponent(NotificationDetailComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.notifySrv, "getById")
      .and.returnValue(
        of({
          error_code: "00",
          data: {}
        })
      )
      spyOn(app.notifySrv, "markAsReadOrUnread")
      .and.returnValue(
        of({
          error_code: "00"
        })
      )
      spyOn(app.notifySrv, "delete")
      .and.returnValue(
        of({
          error_code: "00"
        })
      )
    fixture.detectChanges();
    app.getDetailById();
    app.back();
    app.delete();
    app.markAsUnread();
    app.viewDetail({target_id: 1, status: 'new'});
    expect(app).toBeTruthy();
  });

  it("getById failed", () => {
    const fixture = TestBed.createComponent(NotificationDetailComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.notifySrv, "getById")
      .and.returnValue(
        of({
          error_code: "01"
        })
      )
      spyOn(app.notifySrv, "markAsReadOrUnread")
      .and.returnValue(
        of({
          error_code: "00"
        })
      )
      spyOn(app.notifySrv, "delete")
      .and.returnValue(
        of({
          error_code: "00"
        })
      )
    fixture.detectChanges();
    app.getDetailById();
    app.back();
    app.delete();
    app.markAsUnread();
    app.viewDetail({target_id: 1, status: 'new'});
    expect(app).toBeTruthy();
  });

  it("markAsReadOrUnread failed", () => {
    const fixture = TestBed.createComponent(NotificationDetailComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.notifySrv, "getById")
      .and.returnValue(
        of({
          error_code: "00",
          data: {}
        })
      )
      spyOn(app.notifySrv, "markAsReadOrUnread")
      .and.returnValue(
        of({
          error_code: "01"
        })
      )
      spyOn(app.notifySrv, "delete")
      .and.returnValue(
        of({
          error_code: "00"
        })
      )
    fixture.detectChanges();
    app.getDetailById();
    app.back();
    app.delete();
    app.markAsUnread();
    app.viewDetail({target_id: 1, status: 'new'});
    expect(app).toBeTruthy();
  });

  it("delete failed", () => {
    const fixture = TestBed.createComponent(NotificationDetailComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.notifySrv, "getById")
      .and.returnValue(
        of({
          error_code: "00",
          data: {}
        })
      )
      spyOn(app.notifySrv, "markAsReadOrUnread")
      .and.returnValue(
        of({
          error_code: "00"
        })
      )
      spyOn(app.notifySrv, "delete")
      .and.returnValue(
        of({
          error_code: "01"
        })
      )
    fixture.detectChanges();
    app.getDetailById();
    app.back();
    app.delete();
    app.markAsUnread();
    app.viewDetail({target_id: 1, status: 'new'});
    expect(app).toBeTruthy();
  });
});
