import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  TransactionManager,
  AuthenticationAndAuthorizationService,
} from "@core/services";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { RefundDialogComponent } from "../refund-dialog/refund-dialog.component";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "ite-payment-detail",
  templateUrl: "./payment-detail.component.html",
  styleUrls: ["./payment-detail.component.scss"],
})
export class PaymentDetailComponent implements OnInit, OnDestroy {
  public data;
  public loading = true;
  public merchant: any;
  public issuer: any;
  public transactionId: any;
  public refundHistory = [];
  public history: any = {};
  public feeInfo: any;
  public isRefund = false;

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
    if (!this.checkPermission(20102)) {
      this.loading = true;
      // this.toastr.error(this.getTranslation("transaction.role.view"));
      this.router.navigate(["error-403"]);
      return;
    }
    this.loading = false;
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.transactionId = params["id"];
        this.getDetailTransactionPayment();
      });
  }

  ngOnInit(): void {
    this.issuer = {
      issuer_name: "Momo",
    };
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getDetailTransactionPayment() {
    const request = {
      transaction_id: this.transactionId,
    };
    this.transactionService
      .getDetailTransactionPayment(request)
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
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getDetailTransactionPayment();
      }
    });
  }

  getTranslation(key) {
    return this.translateService.instant(key);
  }

  checkPermission(key) {
    return this.authService.checkPermission(key);
  }

  returnMain() {
    this.router.navigate(["admin/transaction-payment"]);
  }
}
