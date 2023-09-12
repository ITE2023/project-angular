import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '@core/services';

@Component({
  selector: 'ite-qr-code-viewer-from-source-dialog',
  templateUrl: './qr-code-viewer-from-source-dialog.component.html',
  styleUrls: ['./qr-code-viewer-from-source-dialog.component.scss']
})
export class QrCodeViewerFromSourceDialogComponent implements OnInit {
  public imageUrl: any;
  public mainImageUrl: any;
  constructor(
    public dialogRef: MatDialogRef<QrCodeViewerFromSourceDialogComponent>,
    public toast: ToastrService,
    public translate: TranslateService,
    public common: CommonService,
  ) { }


  ngOnInit(): void {
    this.mainImageUrl = this.imageUrl
  }
  download() {
    this.common.downloadFileFromUrl(this.mainImageUrl);
  }
  copyURL() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.mainImageUrl;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toast.success(this.getTranslation('merchant.detail.qrCodeInfo.copySuccess'));
  }
  cancel() {
    this.dialogRef.close(false);
  }

  getTranslation(key) {
    return this.translate.instant(key);
  }
}
