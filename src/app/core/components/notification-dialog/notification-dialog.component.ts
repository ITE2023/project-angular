import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '@core/layout/topbar/change-password/change-password.component';

@Component({
  selector: 'ite-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NotificationDialogComponent>,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close(false);
  }

  changePassword() {
    this.dialogRef.close(false);
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: "400px",
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => { });
  }
}
