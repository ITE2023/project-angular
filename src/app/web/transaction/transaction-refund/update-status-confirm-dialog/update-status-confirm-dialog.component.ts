import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { CommonErrorCode } from "@core/constants";
import { Md5Help } from '@core/helper/md5/md5-helper';
import { TransactionManager } from "@core/services";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "ite-update-status-confirm-dialog",
  templateUrl: "./update-status-confirm-dialog.component.html",
  styleUrls: ["./update-status-confirm-dialog.component.scss"],
})
export class UpdateStatusConfirmDialogComponent implements OnInit {
  public isSuccess: boolean;
  public data: any;
  public form: FormGroup;
  public submitted = false;
  public commonErrorCode = CommonErrorCode;
  public refundId: any;

  constructor(
    public dialogRef: MatDialogRef<UpdateStatusConfirmDialogComponent>,
    private transactionService: TransactionManager,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      password: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.form.controls;
  }

  agree() {
    this.submitted = true;
    if (this.form.invalid) {
      return false;
    }
    const request: any = this.data;
    request.password = Md5Help.md5(this.form.value.password);
    request.id = this.refundId;
    this.transactionService
      .updateTransactionStatus(request)
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
