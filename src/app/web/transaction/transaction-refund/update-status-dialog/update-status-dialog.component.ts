import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { CommonErrorCode } from "@core/constants";
import { TranslateService } from "@ngx-translate/core";
import { UpdateStatusConfirmDialogComponent } from "../update-status-confirm-dialog/update-status-confirm-dialog.component";

@Component({
  selector: "ite-update-status-dialog",
  templateUrl: "./update-status-dialog.component.html",
  styleUrls: ["./update-status-dialog.component.scss"],
})
export class UpdateStatusDialogComponent implements OnInit {
  public form: FormGroup;
  public commonErrorCode = CommonErrorCode;
  public submitted = false;
  public statusList = [
    {
      value: '00',
      desc: "success",
    },
    {
      value: '03',
      desc: "fail",
    },
  ];
  public isSuccess = false;

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<UpdateStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private translateService: TranslateService
  ) {
    this.form = this.fb.group({
      status_code: ["", [Validators.required]],
      txn_reference: ["", [Validators.required]],
      txn_certificate: ["", [Validators.required]],
      txn_desc: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return false;
    }
    const form = this.form.value;
    const dialogRef = this.dialog.open(UpdateStatusConfirmDialogComponent, {
      width: "500px",
      disableClose: true,
    });
    dialogRef.componentInstance.isSuccess = form.status_code === '00';
    dialogRef.componentInstance.data = form;
    dialogRef.componentInstance.refundId = this.data.Id;
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dialogRef.close(true);
      }
    });
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
