import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'ite-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {

 constructor(public dialogRef: MatDialogRef<ModalConfirmComponent>) {}
  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close(false); // Đóng dialog và trả giá trị false
  }

  onYesClick(): void {
    this.dialogRef.close(true); // Đóng dialog và trả giá trị true
  }

}
