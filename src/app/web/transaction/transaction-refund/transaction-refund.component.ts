import { Component, OnInit, OnDestroy } from "@angular/core";
import { Workbook } from "exceljs/dist/exceljs.min.js";
import * as fs from "file-saver";
import * as moment from "moment";
import { CommonConstants, DATE_CONFIG } from "@core/constants";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import {
  TransactionManager,
  CommonService,
  MerchantService,
  AuthenticationAndAuthorizationService,
} from "@core/services";
import { TranslateService } from "@ngx-translate/core";
import { distinctUntilChanged, takeUntil } from "rxjs/operators";
import { DecimalPipe } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { ImportFileDialogComponent } from "./import-file-dialog/import-file-dialog.component";
import { Subject } from "rxjs";

@Component({
  selector: "ite-transaction-refund",
  templateUrl: "./transaction-refund.component.html",
  styleUrls: ["./transaction-refund.component.scss"],
  providers: [DecimalPipe],
})
export class TransactionRefundComponent implements OnInit, OnDestroy {
  public url = "admin/transaction-refund";
  public page = 1;
  public pageSize = 10;
  public total: number;
  public pageSizes = CommonConstants.DEFAULT_PAGE_SIZE_OPTION;
  public loading = true;
  public paymentLists = [];
  public searchForm: FormGroup;
  public searchRequest: any = {};
  public maxDate: Date;
  public minDate: Date;
  public dateMin: Date;
  public firstDay: any;
  public currentDay: any;
  public dateConfig = DATE_CONFIG;
  public maxFromDate: any;
  public maxToDate: any;
  public minToDate: any;

  public statusList = [];

  public issuerList: any = [];
  public refundMethods = [];
  public issuerFilterCtrl: FormControl = new FormControl();
  public issuers: any = [];

  public destroy$: Subject<boolean> = new Subject();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private transactionService: TransactionManager,
    private translateService: TranslateService,
    private commonService: CommonService,
    private merchantService: MerchantService,
    private decimalPipe: DecimalPipe,
    private toastr: ToastrService,
    private authService: AuthenticationAndAuthorizationService
  ) {
    this.maxDate = new Date();
    const y = this.maxDate.getFullYear();
    const m = this.maxDate.getMonth();
    this.firstDay = new Date(y, 0, 1);
    this.currentDay = new Date();

    this.maxFromDate = new Date();
    this.maxToDate = new Date();
    this.minToDate = this.firstDay;

    this.total = this.paymentLists.length;
    this.searchForm = this.formBuilder.group({
      from_date: [this.firstDay],
      to_date: [this.currentDay],
      refund_id: [],
      status_code: [],
      source_name: [],
      source_mobile: [],
      receive_name: [],
      receive_mobile: [],
      // issuer_id: [null],
      // issuer_refund_method: [null],
      // refund_amount: [null],
      // status_code: [null],
      // user_name: [""],
    });
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (Object.keys(data).length > 0) {
          this.setDataFromParams(data);
        }
      });
  }

  ngOnInit(): void {
    // this.commonService
    //   .GetListBoxData("issuer_transaction")
    //   .subscribe((data) => {
    //     if (data.error_code === "00") {
    //       this.issuerList = data.list_data;
    //       this.issuers = Object.assign([], this.issuerList);
    //     }
    //   });
    // this.commonService
    //   .GetListBoxData("issuer_refund_method")
    //   .subscribe((data) => {
    //     if (data.error_code === "00") {
    //       this.refundMethods = data.list_data;
    //     }
    //   });
    // this.commonService
    //   .GetListBoxData("refund_status_code")
    //   .subscribe((data) => {
    //     if (data.error_code === "00") {
    //       this.statusList = data.list_data;
    //     }
    //   });
    this.onValueChange();
    this.commonService
      .getListStatusData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data.error_code === "00") {
          this.statusList = data.list_data;
        }
      });
    this.searchData();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  get f() {
    return this.searchForm.controls;
  }

  public onValueChange() {
    this.issuerFilterCtrl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((val) => {
        this.issuers = val ? this.filterIssuer(val) : this.issuerList;
      });
  }

  private filterIssuer(value: string) {
    const filterValue = value.trim().toLowerCase();
    return this.issuerList.filter(
      (i) =>
        i.desc &&
        (this.commonService.searchLike(i.desc).includes(filterValue) ||
          i.desc.toLowerCase().includes(filterValue))
    );
  }

  keyPressDate(event) {
    const k = event.keyCode;
    return k === 8 || k === 191 || (k >= 47 && k <= 57);
  }

  isInvalidDate(event, field) {
    if (event.target.value === "Invalid date") {
      this.f[field].setValue(null);
    }
  }

  // convert: dd/MM/yyyy -> yyyy-MM-dd
  convertDate(date: string) {
    return (
      date.substring(6) +
      "-" +
      date.substring(3, 5) +
      "-" +
      date.substring(0, 2)
    );
  }

  setDataFromParams(data: any) {
    this.page = data.page ? +data.page : CommonConstants.DEFAULT_PAGE_INDEX;
    this.pageSize = data.size ? +data.size : CommonConstants.DEFAULT_PAGE_SIZE;
    this.searchRequest.page = this.page;
    this.searchRequest.size = this.pageSize;
    if (data.from_date) {
      this.searchRequest.from_date = data.from_date;
      this.f.from_date.setValue(new Date(this.convertDate(data.from_date)));
    }
    if (data.to_date) {
      this.searchRequest.to_date = data.to_date;
      this.f.to_date.setValue(new Date(this.convertDate(data.to_date)));
    }
    if (data.refund_id) {
      this.searchRequest.refund_id = data.refund_id.trim();
      this.f.refund_id.setValue(data.refund_id.trim());
    }
    if (data.status_code) {
      this.searchRequest.status = data.status_code;
      this.f.status_code.setValue(data.status_code);
    }
    if (data.source_name) {
      this.searchRequest.source_name = data.source_name;
      this.f.source_name.setValue(data.source_name);
    }
    if (data.source_mobile) {
      this.searchRequest.source_mobile = data.source_mobile;
      this.f.source_mobile.setValue(data.source_mobile);
    }

    if (data.receive_name) {
      this.searchRequest.receiver_name = data.receive_name;
      this.f.receive_name.setValue(data.receive_name);
    }
    if (data.receive_mobile) {
      this.searchRequest.receiver_mobile = data.receive_mobile;
      this.f.receive_mobile.setValue(data.receive_mobile);
    }
    // if (data.issuer_id) {
    //   this.searchRequest.issuer_id = data.issuer_id;
    //   this.f.issuer_id.setValue(data.issuer_id);
    // }
    // if (data.issuer_refund_method) {
    //   this.searchRequest.issuer_refund_method = data.issuer_refund_method;
    //   this.f.issuer_refund_method.setValue(data.issuer_refund_method);
    // }

    // if (data.status_code) {
    //   this.searchRequest.status_code = data.status_code;
    //   this.f.status_code.setValue(data.status_code);
    // }
    // if (data.user_name) {
    //   this.searchRequest.user_name = data.user_name;
    //   this.f.user_name.setValue(data.user_name);
    // }
  }

  public searchData() {
    const form = this.searchForm.value;
    this.searchRequest = {
      page: this.page,
      size: this.pageSize,
    };
    if (form.from_date) {
      this.searchRequest.from_date = moment(form.from_date).format(
        CommonConstants.DATE_FORMAT_DATEPICKER
      );
    }
    if (form.to_date) {
      this.searchRequest.to_date = moment(form.to_date).format(
        CommonConstants.DATE_FORMAT_DATEPICKER
      );
    }
    if (form.refund_id) {
      this.searchRequest.refund_id = form.refund_id.trim();
    }
    if (form.status_code) {
      this.searchRequest.status = form.status_code;
    }
    if (form.source_name) {
      this.searchRequest.source_name = form.source_name.trim();
    }
    if (form.source_mobile) {
      this.searchRequest.source_mobile = form.source_mobile.trim();
    }
    if (form.receive_name) {
      this.searchRequest.receiver_name = form.receive_name.trim();
    }
    if (form.receive_mobile) {
      this.searchRequest.receiver_mobile = form.receive_mobile.trim();
    }

    this.router.navigate([this.url], {
      queryParams: this.searchRequest,
    });
    this.getPaymentList(this.searchRequest);
  }

  changePage(page) {
    if (this.page !== page) {
      this.page = page;
      this.searchRequest.page = this.page;
      this.searchRequest.size = this.pageSize;
      this.router.navigate([this.url], {
        queryParams: this.searchRequest,
      });
      this.getPaymentList(this.searchRequest);
    }
  }

  onPageSizeChange(pSize) {
    this.page = 1;
    this.pageSize = pSize;
    this.searchRequest.page = this.page;
    this.searchRequest.size = pSize;
    this.router.navigate([this.url], {
      queryParams: this.searchRequest,
    });
    this.getPaymentList(this.searchRequest);
  }

  private getPaymentList(request) {
    this.loading = true;
    this.paymentLists = [];

    this.transactionService
      .getTransactionRefund(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data.error_code === "00" || data.error_code === "02") {
          this.total = data.total_record ? data.total_record : 0;
          this.paymentLists = data.list_data ? data.list_data : [];
          this.loading = false;
        } else {
          this.toastr.error(
            this.getTranslation("transaction.errors." + data.error_code)
          );
        }
      });
  }

  public exportToExcel() {
    this.searchRequest.size = 10000000;
    this.transactionService
      .getTransactionRefund(this.searchRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data.error_code === "00" || data.error_code === "02") {
          const date = moment().format("DDMMYYhhmm");
          const title = this.getTranslation("transaction.refund.title");
          const header = [
            this.getTranslation("transaction.refund.data_table.no"),
            this.getTranslation("transaction.refund.data_table.trans_id"),
            this.getTranslation("transaction.refund.data_table.amount"),
            this.getTranslation(
              "transaction.refund.data_table.origin_trans_id"
            ),
            this.getTranslation("transaction.refund.data_table.source_acc"),
            this.getTranslation("transaction.refund.data_table.source_name"),
            this.getTranslation("transaction.refund.data_table.receive_acc"),
            this.getTranslation("transaction.refund.data_table.receive_name"),

            this.getTranslation("transaction.refund.data_table.trans_status"),
            this.getTranslation("transaction.refund.data_table.content"),
            this.getTranslation("transaction.refund.data_table.created_date"),
          ];
          const exportData = [];
          data.list_data?.forEach((e, i) => {
            exportData.push([
              "" + (i + 1),
              e.id,
              this.decimalPipe.transform(e.amount, "1.0-2"),
              e.origintransactionId,

              e.sourceInfo.username,
              e.sourceInfo.fullname,
              e.receiverInfo.username,
              e.receiverInfo.fullname,

              e.status
                ? this.getTranslation(
                    "transaction.payment.statusList." + e.status
                  )
                : "",
              e.content,
              moment(e.createdAt).format("DD/MM/YYYY HH:mm"),
            ]);
          });
          const workbook = new Workbook();
          const worksheet = workbook.addWorksheet(title);

          const time = worksheet.addRow([
            this.searchRequest.from_date + " - " + this.searchRequest.to_date,
          ]);
          time.font = { bold: true };
          worksheet.addRow([]);
          const headerRow = worksheet.addRow(header);
          headerRow.font = { bold: true };
          exportData.forEach((row) => {
            worksheet.addRow(row);
          });
          worksheet.addRow([]);
          const footerRow = worksheet.addRow([
            this.getTranslation("commonAction.total") +
              ": " +
              (data.total_record ? data.total_record : 0),
          ]);
          footerRow.font = { bold: true };

          // Set Columns width
          worksheet.columns = [
            { width: 25 },
            { width: 25 },
            { width: 10 },
            { width: 25 },

            { width: 20 },
            { width: 20 },
            { width: 20 },
            { width: 20 },

            { width: 20 },
            { width: 35 },
            { width: 20 },
          ];

          // Generate excel file with given name
          workbook.xlsx.writeBuffer().then((res) => {
            const blob = new Blob([res], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            fs.saveAs(
              blob,
              this.getTranslation("transaction.refund.file-name") +
                date +
                ".xlsx"
            );
          });
        }
      });
  }

  viewDetail(item) {
    // if (this.checkPermission(20202)) {
    this.router.navigateByUrl("/admin/transaction-refund/detail/" + item.id);
    // }
  }

  getTranslation(key) {
    return this.translateService.instant(key);
  }

  checkPermission(key) {
    return this.authService.checkPermission(key);
  }

  importFile() {
    const dialogRef = this.dialog.open(ImportFileDialogComponent, {
      width: "500px",
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getPaymentList(this.searchRequest);
      }
    });
  }

  dateChange(field) {
    if (field === "from_date") {
      this.minToDate = this.searchForm.value.from_date;
    }
    if (field === "to_date") {
      this.maxFromDate = this.searchForm.value.to_date;
    }
  }
}
