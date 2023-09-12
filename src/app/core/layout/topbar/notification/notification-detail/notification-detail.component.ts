import { Component, OnInit } from "@angular/core";
import { AuthenticationAndAuthorizationService, CommonService, NotificationService } from "@core/services";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "ite-notification-detail",
  templateUrl: "./notification-detail.component.html",
  styleUrls: ["./notification-detail.component.scss"],
})
export class NotificationDetailComponent implements OnInit {
  public id: any;
  public notify: any = {};
  public loading = true;

  constructor(
    private notifySrv: NotificationService,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    public location: Location,
    private authService: AuthenticationAndAuthorizationService,
    private commonService: CommonService
  ) {
    if (!this.checkPermission(2105)) {
      this.loading = true;
      // this.toastr.error(this.getTranslation("transaction.role.view"));
      this.router.navigate(["error-403"]);
      return;
    }
    this.loading = false;
    this.route.paramMap.subscribe((params) => {
      this.id = +params.get("id");
      this.getDetailById();
    });
  }

  ngOnInit(): void { }

  getDetailById() {
    this.notifySrv.getById(this.id).subscribe((data) => {
      if (data.error_code === "00") {
        this.notify = data.data;
      } else {
        this.toastr.error(
          this.getTranslation("notifications.errors." + data.error_code)
        );
      }
    });
  }

  getTranslation(key) {
    return this.translateService.instant(key);
  }

  back() {
    this.location.back();
  }

  delete() {
    const rq = {
      notifications: [this.id],
    };
    this.notifySrv.delete(rq).subscribe((data) => {
      this.showResult('deleted', data);
    });
  }

  markAsUnread() {
    const rq = {
      notifications: [this.id],
      type: "unread",
    };
    this.notifySrv.markAsReadOrUnread(rq).subscribe((data) => {
      this.showResult('unread', data);
    });
  }

  viewDetail(item) {
    const url = this.notifySrv.getUrl(item);
    this.router.navigateByUrl(url);
  }

  showResult(type, data) {
    if (data.error_code === "00") {
      this.toastr.success(this.getTranslation("notifications." + type));
      this.back();
    } else {
      this.toastr.error(
        this.getTranslation("notifications.errors." + data.error_code)
      );
    }
  }

  checkPermission(key) {
    return this.authService.checkPermission(key);
  }

  multiLangData(str) {
    return this.commonService.multiLangData(str);
  }
}
