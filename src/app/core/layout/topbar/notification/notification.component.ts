import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationAndAuthorizationService, CommonService, NotificationService } from "@core/services";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";

@Component({
  selector: "ite-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"],
})
export class NotificationComponent implements OnInit, OnDestroy {
  public totalUnread = 0;
  public notificationList = [];
  public page = 1;
  public pageSize = 5;
  public subscription: Subscription;
  public subscription2: Subscription;

  constructor(
    private router: Router,
    private notifySrv: NotificationService,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private authService: AuthenticationAndAuthorizationService,
    private commonService: CommonService
  ) {
    this.getTopFive();
  }

  ngOnInit(): void {
    this.subscription = this.notifySrv
      .getChangeInPage()
      .subscribe((res) => {
        if (res) {
          this.getTopFive();
        }
      });
    this.subscription2 = this.notifySrv
      .getReadInPopup()
      .subscribe((res) => {
        if (res) {
          this.getTopFive();
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }

  getTopFive() {
    const request = {
      page: this.page,
      size: this.pageSize,
    };
    this.notificationList = [];
    this.notifySrv.getNotification(request).subscribe((res) => {
      if (res.error_code === "00" || res.error_code === "02") {
        this.notificationList = res.list_data ? res.list_data : [];
        this.totalUnread = res.new_record ? res.new_record : 0;
      }
    });
  }

  markAllAsRead() {
    this.notifySrv.markAllAsRead().subscribe((data) => {
      if (data.error_code === "00") {
        this.successMsg("notifications.read");
        this.notificationList.forEach((i) => {
          i.status = "read";
        });
        this.totalUnread = 0;
        this.notifySrv.setChangeInPopup(true);
      }
    });
  }

  markAsReadOrUnread(item) {
    if (item.isRead) {
      this.notifySrv.markAsReadOrUnread(item.id).subscribe((data) => {
        this.successMsg("notifications.unread");
      });
    } else {
      this.notifySrv.markAsReadOrUnread(item.id).subscribe((data) => {
        this.successMsg("notifications.read");
      });
    }
    this.getTopFive();
  }

  delete(item) {
    this.notifySrv.delete(item.id).subscribe((data) => {
      this.successMsg("notifications.deleted");
    });
    this.getTopFive();
  }

  seeAll() {
    this.router.navigateByUrl("/admin/notification?page=1&size=10");
  }

  getTranslation(key) {
    return this.translateService.instant(key);
  }

  successMsg(msg) {
    this.toastr.success(this.getTranslation(msg));
  }

  viewDetail(item) {
    if (this.checkPermission(2105)) {
      const url = this.notifySrv.getUrl(item);
      if (item.status === "new") {
        const rq = {
          notifications: [item.id],
          type: "read",
        };
        this.notifySrv.markAsReadOrUnread(rq).subscribe((data) => {
          if (data.error_code === "00") {
            this.notifySrv.setReadInPopup(true);
            this.router.navigateByUrl(url);
          }
        });
      } else {
        this.router.navigateByUrl(url);
      }
    }
  }

  checkPermission(key) {
    return this.authService.checkPermission(key);
  }

  multiLangData(str) {
    return this.commonService.multiLangData(str);
  }
}
