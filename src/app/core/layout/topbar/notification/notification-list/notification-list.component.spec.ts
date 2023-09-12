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
import { NotificationListComponent } from "./notification-list.component";

describe("NotificationListComponent", () => {
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
      declarations: [NotificationListComponent, PaginationComponent],
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
        NotificationService
      ],
    }).compileComponents();
  }));
  it("get list", () => {
    const fixture = TestBed.createComponent(NotificationListComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.notifySrv, "getNotification")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: [{}],
          new_record: 2
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
    app.initialData();
    app.changePage(2);
    app.onPageSizeChange(20);
    app.getNotification();
    // app.reload();
    app.delete();
    app.markAsReadOrUnread('read');
    app.viewDetail({target_id: 1, status: 'new'});
    app.viewDetail({target_id: null, status: 'new'});
    app.checkOrUncheckAll({checked: true});
    app.checkOrUncheckAll({checked: false});
    app.checkOrUncheckItem({isChecked: true});
    app.checkOrUncheckItem({isChecked: false});
    app.navigate({content: 'abc', target_id: 1, status: 'new'});
    app.navigate({content: 'abc', target_id: 1, status: 'read'});
    app.ngOnDestroy();
    expect(app).toBeTruthy();
  });
  it("getNotification failed", () => {
    const fixture = TestBed.createComponent(NotificationListComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.notifySrv, "getNotification")
      .and.returnValue(
        of({
          error_code: "01",
        })
      )
    fixture.detectChanges();
    app.initialData();
    app.getNotification();
    expect(app).toBeTruthy();
  });
  it("markAsReadOrUnread failed", () => {
    const fixture = TestBed.createComponent(NotificationListComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.notifySrv, "getNotification")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: [{}],
          new_record: 2
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
    app.initialData();
    app.changePage(2);
    app.onPageSizeChange(20);
    app.getNotification();
    app.markAsReadOrUnread('read');
    expect(app).toBeTruthy();
  });
  it("delete failed", () => {
    const fixture = TestBed.createComponent(NotificationListComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(app.notifySrv, "getNotification")
      .and.returnValue(
        of({
          error_code: "00",
          list_data: [{}],
          new_record: 2
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
    app.initialData();
    app.changePage(2);
    app.onPageSizeChange(20);
    app.getNotification();
    app.delete();
    expect(app).toBeTruthy();
  });
});
