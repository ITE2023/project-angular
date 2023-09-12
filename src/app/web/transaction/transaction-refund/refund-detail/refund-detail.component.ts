import { Component, OnInit, OnDestroy } from "@angular/core";
import { RefundDialogComponent } from "../../transaction-payment/refund-dialog/refund-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AuthenticationAndAuthorizationService,
  TransactionManager,
} from "@core/services";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { UpdateStatusDialogComponent } from "../update-status-dialog/update-status-dialog.component";
import { ChangeStatusComponent } from "../change-status/change-status.component";
import { ApproveRefundDialogComponent } from "../approve-refund-dialog/approve-refund-dialog.component";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "ite-refund-detail",
  templateUrl: "./refund-detail.component.html",
  styleUrls: ["./refund-detail.component.scss"],
})
export class RefundDetailComponent implements OnInit, OnDestroy {
  public data: any = {};
  public loading = true;
  public merchant: any;
  public issuer: any;

  public history = [];
  public relatedTrans = [];
  public transactionId: any;

  public destroy$: Subject<boolean> = new Subject();

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private transactionService: TransactionManager,
    private router: Router,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private authService: AuthenticationAndAuthorizationService
  ) {
    if (!this.checkPermission(20202)) {
      this.loading = true;
      // this.toastr.error(this.getTranslation("transaction.role.view"));
      this.router.navigate(["error-403"]);
      return;
    }
    this.loading = false;
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.transactionId = params["id"];
        this.getDetailTransactionRefund();
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getDetailTransactionRefund() {
    const request = {
      refund_id: this.transactionId,
    };
    this.transactionService
      .getDetailTransactionRefund(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res.error_code === "00") {
          this.data = res.detail;
        } else {
          this.toastr.error(
            this.getTranslation("transaction.errors." + res.error_code)
          );
        }
      });
  }

  public openRefund() {
    const dialogRef = this.dialog.open(RefundDialogComponent, {
      width: "500px",
      data: this.data,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  getTranslation(key) {
    return this.translateService.instant(key);
  }

  checkPermission(key) {
    return this.authService.checkPermission(key);
  }

  transactionQuery() {
    this.getDetailTransactionRefund();
  }

  updateStatus() {
    if (this.data?.statusCode === "01") {
      // Đã ghi nhận của ĐVCNTT --> Đã gửi yêu cầu cho TCPH
      const dialogRef = this.dialog.open(ChangeStatusComponent, {
        width: "500px",
        data: this.data,
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.showResult(result);
      });
    } else {
      // Đã gửi yêu cầu cho TCPH --> Thành công/Không thành công
      const dialogRef = this.dialog.open(UpdateStatusDialogComponent, {
        width: "500px",
        data: this.data,
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.showResult(result);
      });
    }
  }

  showResult(result) {
    if (result) {
      this.getDetailTransactionRefund();
    }
  }

  viewTranDetail(item) {
    if (!item.original_number) {
      this.router.navigateByUrl(
        "/admin/transaction-payment/detail/" + item.transaction_id
      );
    } else {
      this.router.navigateByUrl(
        "/admin/transaction-refund/detail/" + item.transaction_id
      );
    }
  }

  approveRefund() {
    const dialogRef = this.dialog.open(ApproveRefundDialogComponent, {
      width: "500px",
      data: this.data,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.showResult(result);
    });
  }

  returnMain() {
    this.router.navigate(["/admin/transaction-refund"]);
  }
}
