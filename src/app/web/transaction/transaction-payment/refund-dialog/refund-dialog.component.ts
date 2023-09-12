import { Component, OnInit, Inject } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { CommonErrorCode } from "@core/constants";
import { RefundResultDialogComponent } from "../refund-result-dialog/refund-result-dialog.component";
import { CommonService, TransactionManager } from '@core/services';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "ite-refund-dialog",
  templateUrl: "./refund-dialog.component.html",
  styleUrls: ["./refund-dialog.component.scss"],
})
export class RefundDialogComponent implements OnInit {
  public isShowTextarea = false;
  public reasonForm: FormGroup;
  public commonErrorCode = CommonErrorCode;
  public reasons = [];
  public amountError = false;
  public submitted = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<RefundDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private commonService: CommonService,
    private transaction: TransactionManager,
    private toastr: ToastrService,
    private translateService: TranslateService,
  ) {
  }

  get f() {
    return this.reasonForm.controls;
  }

  ngOnInit(): void {
    this.commonService.GetListBoxData('refund_reason').subscribe(
      data => {
        if (data.error_code === '00') {
          this.reasons = data.list_data ? data.list_data : [];
        }
      }
    );
    this.reasonForm = this.fb.group({
      amount: ["", [Validators.required]],
      reason: ["", [Validators.required]],
    });
  }

  public cancel() {
    this.dialogRef.close(false);
  }

  public onSubmit() {
    this.submitted = true;
    this.reasonForm.markAllAsTouched();
    const form = this.reasonForm.value;
    this.amountError =
      form.amount && (+form.amount > +this.data.available_refund_amount || +form.amount === 0);
    if (this.reasonForm.invalid || this.amountError) {
      return false;
    }
    const rq = {
      merchant_id: this.data.merchantId,
      transaction_reference_id: this.data.id,
      txn_amount: +this.reasonForm.value.amount,
      desc: this.isShowTextarea ? this.reasonForm.value.contentReason.trim() : this.reasons.filter(x => x.value === this.reasonForm.value.reason)[0].desc
    };
    this.transaction.refund(rq).subscribe(
      data => {
        if (data.error_code === '00') {
          this.openDialogResult(data);
        } else {
          this.toastr.error(this.translateService.instant('transaction.errors.' + data.error_code));
        }
      }
    );
  }

  public onChangeShowInput(event) {
    if (event.value === "other") {
      this.isShowTextarea = true;
      this.reasonForm.addControl(
        "contentReason",
        this.fb.control("", Validators.required)
      );
    } else {
      this.isShowTextarea = false;
      this.reasonForm.removeControl("contentReason");
    }
  }

  public openDialogResult(info) {
    const dialogRef = this.dialog.open(RefundResultDialogComponent, {
      width: "500px",
      data: info,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dialogRef.close(true);
      }
    });
  }
}
