import { Component, OnInit, AfterViewInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { CommonService, BackgroundLoader } from '@core/services';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "ite-document-viewer",
  templateUrl: "./document-viewer.component.html",
  styleUrls: ["./document-viewer.component.scss"],
})
export class DocumentViewerComponent implements OnInit, AfterViewInit {
  public docFile: any;
  public docUrl: any;
  public error: any;
  public docType: any;
  public fileName = '';
  public isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<DocumentViewerComponent>,
    public commonService: CommonService,
    private sanitizer: DomSanitizer,
    public loader: BackgroundLoader,
  ) {
    this.loader.show();
  }

  ngOnInit(): void {
    this.error = false;
    this.docType = this.commonService.getExtensionFile(this.docFile?.name)?.toLowerCase();
    if (this.docFile) {
      this.docUrl = (this.docType !== 'pdf') ? this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.docFile)) : URL.createObjectURL(this.docFile);
      this.isLoading = true;
    }
  }

  ngAfterViewInit(): void {
    this.loader.hide();
  }

  close() {
    this.dialogRef.close();
  }

  changeError() {
    this.error = true;
  }
}
