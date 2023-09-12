import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonConstants } from "@core/constants";
import { Router, ActivatedRoute } from "@angular/router";
import {
  NotificationService,
  CommonService,
} from "@core/services";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { FormControl } from "@angular/forms";
import { distinctUntilChanged } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "ite-notification-list",
  templateUrl: "./notification-list.component.html",
  styleUrls: ["./notification-list.component.scss"],
})
export class NotificationListComponent implements OnInit, OnDestroy {
  public total = 0;
  public notificationList = [];
  public url = "admin/notification";
  public page = 1;
  public pageSize = 10;
  public pageSizes = CommonConstants.DEFAULT_PAGE_SIZE_OPTION;
  public loading = false;
  public searchRequest: any = {};
  public checkedAll = false;
  public indeterminate = false;
  public checkedList = [];
  public selectedList = [];
  public searchCtrl: FormControl = new FormControl();
  public copyNotifications = [];
  public initTotal: any;
  public totalUnread = 0;
  public subscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notifySrv: NotificationService,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private commonService: CommonService
  ) {
    this.activatedRoute.queryParams.subscribe((data) => {
      if (Object.keys(data).length > 0) {
        this.setDataFromParams(data);
      }
    });
  }

  ngOnInit(): void {
    this.initialData();
    this.subscription = this.notifySrv
      .getChangeInPopup()
      .subscribe((res) => {
        if (res) {
          this.initialData();
        }
      });
    this.searchCtrl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((val) => {
        this.copyNotifications = val
          ? this.filterNotification(val)
          : this.notificationList;
        this.total = val ? this.copyNotifications.length : this.initTotal;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private filterNotification(value: string) {
    const filterValue = value.trim().toLowerCase();
    return this.notificationList.filter(
      (i) =>
        (i.subject && (this.commonService.searchLike(this.multiLangData(i.subject)).includes(filterValue) ||
          this.multiLangData(i.subject).toLowerCase().includes(filterValue))) ||
        (i.content && (this.commonService.searchLike(this.multiLangData(i.content)).includes(filterValue) ||
          this.multiLangData(i.content).toLowerCase().includes(filterValue)))
    );
  }

  setDataFromParams(data: any) {
    this.page = data.page ? +data.page : CommonConstants.DEFAULT_PAGE_INDEX;
    this.pageSize = data.size ? +data.size : CommonConstants.DEFAULT_PAGE_SIZE;
  }

  changePage(page) {
    if (this.page !== page) {
      this.page = page;
      this.searchRequest.page = this.page;
      this.searchRequest.size = this.pageSize;
      this.router.navigate([this.url], {
        queryParams: this.searchRequest,
      });
      this.getNotification(this.searchRequest);
    }
  }

  onPageSizeChange(pSize) {
    this.page = 1;
    this.searchRequest.page = this.page;
    this.searchRequest.size = this.pageSize = pSize;
    this.router.navigate([this.url], {
      queryParams: this.searchRequest,
    });
    this.getNotification(this.searchRequest);
  }

  getNotification(request) {
    this.checkedAll = false;
    this.indeterminate = false;
    this.searchRequest.page = this.page;
    this.searchRequest.size = this.pageSize;
    this.loading = true;
    this.notificationList = [];
    this.copyNotifications = [];
    this.notifySrv.getNotification(request).subscribe((data) => {
      if (data.error_code === "00" || data.error_code === "02") {
        this.total = this.initTotal = data.total_record;
        if (this.total) {
          if (!data.list_data && this.page > 1) {
            this.changePage(this.page - 1);
          }
          if (data.list_data) {
            data.list_data.map((i) => (i.isChecked = false));
            this.notificationList = data.list_data;
            this.notificationList.forEach((item) => {
              if (this.selectedList.includes(+item.id)) {
                item.isChecked = true;
              }
            });
          }
        } else {
          this.notificationList = [];
        }
        this.copyNotifications = Object.assign([], this.notificationList);
        this.initialChecked();
        this.loading = false;
      } else {
        this.toastr.error(
          this.getTranslation("notifications.errors." + data.error_code)
        );
      }
    });
  }

  reload(): void {
    window.location.reload();
  }

  initialData() {
    this.searchRequest = {
      page: this.page,
      size: this.pageSize,
    };
    this.router.navigate([this.url], {
      queryParams: this.searchRequest,
    });
    this.getNotification(this.searchRequest);
  }

  delete() {
    this.getCheckedList();
    if (!this.checkedList.length) {
      this.warningMsg("notifications.noSelected");
    } else {
      const rq = {
        notifications: this.checkedList,
      };
      this.notifySrv.delete(rq).subscribe((data) => {
        if (data.error_code === "00") {
          this.successMsg("notifications.deleted");
          this.notifySrv.setChangeInPage(true);
          this.getNotification(this.searchRequest);
        } else {
          this.warningMsg("notifications.errors." + data.error_code);
        }
      });
    }
  }

  markAsReadOrUnread(type) {
    this.getCheckedList();
    if (!this.checkedList.length) {
      this.warningMsg("notifications.noSelected");
    } else {
      const rq = {
        notifications: this.checkedList,
        type: type,
      };
      this.notifySrv.markAsReadOrUnread(rq).subscribe((data) => {
        if (data.error_code === "00") {
          this.successMsg("notifications." + type);
          this.notifySrv.setChangeInPage(true);
          this.getNotification(this.searchRequest);
        } else {
          this.warningMsg("notifications.errors." + data.error_code);
        }
      });
    }
  }

  viewDetail(item) {
    if (item.status === "new") {
      const rq = {
        notifications: [item.id],
        type: "read",
      };
      this.notifySrv.markAsReadOrUnread(rq).subscribe((data) => {
        if (data.error_code === "00") {
          this.notifySrv.setReadInPopup(true);
          this.router.navigateByUrl("/admin/notification/detail/" + item.id);
        }
      });
    } else {
      this.router.navigateByUrl("/admin/notification/detail/" + item.id);
    }
  }

  getCheckedList() {
    const arr = this.notificationList.filter(
      (i) => this.selectedList.indexOf(i.id) !== -1
    );
    this.checkedList = [];
    arr.forEach((i) => {
      this.checkedList.push(i.id);
    });
  }

  getTranslation(key) {
    return this.translateService.instant(key);
  }

  warningMsg(msg) {
    this.toastr.error(this.getTranslation(msg));
  }

  successMsg(msg) {
    this.toastr.success(this.getTranslation(msg));
  }

  initialChecked() {
    const l = this.notificationList.filter((i) => i.isChecked === true).length;
    if (l === 0) {
      this.checkedAll = false;
      this.indeterminate = false;
    } else if (
      l === this.pageSize ||
      l === this.total ||
      l === this.notificationList.length
    ) {
      this.checkedAll = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }

  uniqueItem(array) {
    array = array.reduce((a, b) => {
      if (a.indexOf(b) < 0) {
        a.push(b);
      }
      return a;
    }, []);
    return array;
  }

  checkOrUncheckAll(event) {
    if (event.checked) {
      this.notificationList.forEach((item) => {
        item.isChecked = true;
        this.selectedList.push(+item.id);
      });
    } else {
      this.notificationList.forEach((item) => {
        item.isChecked = false;
        const index = this.selectedList.indexOf(+item.id);
        if (index > -1) {
          this.selectedList.splice(index, 1);
        }
      });
    }
    this.uniqueItem(this.selectedList);
  }

  checkOrUncheckItem(item) {
    this.initialChecked();
    // new
    if (item.isChecked) {
      this.selectedList.push(+item.id);
    } else {
      const index = this.selectedList.indexOf(+item.id);
      if (index > -1) {
        this.selectedList.splice(index, 1);
      }
    }
    this.uniqueItem(this.selectedList);
  }

  cutString(str) {
    return (str && str.length > 256) ? str.substring(0, 256) + "..." : str;
  }

  navigate(item) {
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

  multiLangData(str) {
    return this.commonService.multiLangData(str);
  }
}
