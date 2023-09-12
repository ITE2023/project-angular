import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "ite-qr-code-viewer-dialog",
  templateUrl: "./qr-code-viewer-dialog.component.html",
  styleUrls: ["./qr-code-viewer-dialog.component.scss"],
})
export class QrCodeViewerDialogComponent implements OnInit {
  public imageUrl: any;
  public imageUrlStatus = true;
  public mainImageUrl: any;
  public fileName: any;
  constructor(public dialogRef: MatDialogRef<QrCodeViewerDialogComponent>) { }

  ngOnInit(): void {
    this.mainImageUrl = this.imageUrl;
    this.fileName = this.imageUrl.split(/[/]+/).pop();
    // if (!this.imageUrlStatus) {
    //   let file = new FileReader();
    //   file.readAsDataURL(this.imageUrl);
    //   file.onload = () => {
    //     this.imageUrl = file.result;
    //   };
    // }
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
