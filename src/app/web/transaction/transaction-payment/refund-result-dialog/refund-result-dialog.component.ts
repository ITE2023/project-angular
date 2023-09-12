import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

@Component({
  selector: "ite-refund-result-dialog",
  templateUrl: "./refund-result-dialog.component.html",
  styleUrls: ["./refund-result-dialog.component.scss"],
})
export class RefundResultDialogComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<RefundResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {}

  public cancel() {
    this.dialogRef.close(true);
  }
}
