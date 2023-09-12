import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionManager } from '@core/services';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ite-approve-refund-dialog',
  templateUrl: './approve-refund-dialog.component.html',
  styleUrls: ['./approve-refund-dialog.component.scss']
})
export class ApproveRefundDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ApproveRefundDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private transactionService: TransactionManager,
    private toastr: ToastrService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
  }

  agree() {
    const request = {
      id: this.data.Id,
      merchant_id: this.data.merchantId
    };
    this.transactionService
      .approveRefund(request)
      .subscribe((res) => {
        if (res.error_code === "00") {
          this.dialogRef.close(true);
          this.toastr.success(
            this.getTranslation("transaction.refund.approve-refund-success")
          );
        } else {
          this.toastr.error(
            this.getTranslation("transaction.errors." + res.error_code)
          );
        }
      });
  }

  getTranslation(key) {
    return this.translateService.instant(key);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
