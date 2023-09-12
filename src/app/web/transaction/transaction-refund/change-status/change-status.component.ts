import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionManager } from '@core/services';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UpdateStatusConfirmDialogComponent } from '../update-status-confirm-dialog/update-status-confirm-dialog.component';

@Component({
  selector: 'ite-change-status',
  templateUrl: './change-status.component.html',
})
export class ChangeStatusComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdateStatusConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private transactionService: TransactionManager,
    private toastr: ToastrService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
  }

  agree() {
    const request = {
      id: this.data.Id
    };
    this.transactionService
      .updateTransactionStatusIssuer(request)
      .subscribe((res) => {
        if (res.error_code === "00") {
          this.dialogRef.close(true);
          this.toastr.success(
            this.getTranslation("transaction.refund.update-status.success")
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
