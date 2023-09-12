import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { CommonErrorCode } from "@core/constants";
import { Md5Help } from '@core/helper/md5/md5-helper';
import { BrowserAndLocationInformationService, CommonService, TransactionManager } from "@core/services";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "ite-import-file-dialog",
  templateUrl: "./import-file-dialog.component.html",
  styleUrls: ["./import-file-dialog.component.scss"],
})
export class ImportFileDialogComponent implements OnInit {
  public fileAccept = ["xls", "xlsx"];
  public form: FormGroup;
  public submitted = false;
  public commonErrorCode = CommonErrorCode;
  public uploadError = "";
  public fileName = "";
  public types = [
    {
      value: "0",
    },
    {
      value: "1",
    }
  ];
  public isPassword = false;

  constructor(
    public dialogRef: MatDialogRef<ImportFileDialogComponent>,
    private transService: TransactionManager,
    private commonService: CommonService,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      type: ["", [Validators.required]],
      file: ["", [Validators.required]],
      password: [""],
    });
  }

  get f() {
    return this.form.controls;
  }

  getTranslation(key) {
    return this.translateService.instant(key);
  }

  agree() {
    this.submitted = true;
    if (this.form.invalid) {
      return false;
    }
    const form = this.form.value;
    const info = BrowserAndLocationInformationService.getInfo();
    if (!info.ip_address || info.ip_address === 'undefined') {
      info.ip_address = '118.70.124.48';
    }
    if (this.isPassword) {
      // Đã gửi yêu cầu cho TCPH --> Thành công/Không thành công
      info.password = Md5Help.md5(form.password);
      this.transService.importFile(form.file, info).subscribe((data) => {
        this.showResult(data);
      });
    } else {
      // Đã ghi nhận của ĐVCNTT --> Đã gửi yêu cầu cho TCPH
      this.transService.importFileIssuer(form.file, info).subscribe((data) => {
        this.showResult(data);
      });
    }
  }

  showResult(data) {
    if (data.error_code === "00") {
      this.dialogRef.close(true);
      this.toastr.success(this.getTranslation("transaction.refund.import.success"));
    } else {
      this.toastr.error(
        this.getTranslation("transaction.errors." + data.error_code)
      );
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }

  changeType(event) {
    this.isPassword = event.value !== '0';
    this.isPassword ? this.f.password.setValidators([Validators.required]) : this.f.password.setValidators(null);
    this.f.password.setValue('');
    this.f.file.setValue('');
    this.fileName = '';
  }

  onSelectFileDocument(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const checkFile = this.documentValidate(file);
      if (checkFile.validate) {
        this.uploadError = "";
        const reader = new FileReader();
        reader.readAsDataURL(file);
        this.f.file.setValue(file);
        this.fileName = file.name;
      } else {
        this.fileName = "";
        this.uploadError = `error.upload.${checkFile.message}`;
      }
    }
  }

  documentValidate(file: any): any {
    if (
      this.fileAccept.filter(
        (value) =>
          value ===
          this.commonService.getExtensionFile(file.name)?.toLowerCase()
      ).length > 0
    ) {
      if (file.size > 5 * 1024 * 1024) {
        return {
          validate: false,
          message: "overSize",
        };
      } else {
        return {
          validate: true,
        };
      }
    } else {
      return {
        validate: false,
        message: "wrongFormat",
      };
    }
  }

  chooseDocument(event) {
    event.preventDefault();
    const element: HTMLElement = document.getElementById(
      "upload"
    );
    element.click();
  }
}
