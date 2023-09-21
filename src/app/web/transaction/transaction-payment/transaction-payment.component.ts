import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { Workbook } from "exceljs/dist/exceljs.min.js";
import * as fs from "file-saver";
import * as moment from "moment";
import { CommonConstants, DATE_CONFIG } from "@core/constants";
import {
  TransactionManager,
  CommonService,
  MerchantService,
  AuthenticationAndAuthorizationService,
} from "@core/services";
import { distinctUntilChanged, takeUntil } from "rxjs/operators";
import { DecimalPipe } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";

@Component({
  selector: "ite-transaction-payment",
  templateUrl: "./transaction-payment.component.html",
  styleUrls: ["./transaction-payment.component.scss"],
  providers: [DecimalPipe],
})
export class TransactionPaymentComponent implements OnInit, OnDestroy {
  public url = "admin/transaction-payment";
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

  public merchantList = [];
  public subMerchantList = [];
  public statusList = [];
  public paymentMethodList = [];
  public channelList = [];
  public merchantFilterCtrl: FormControl = new FormControl();
  public merchants: any = [];
  public subMerchantFilterCtrl: FormControl = new FormControl();
  public subMerchants: any = [];
  public issuerList: any = [];
  public agencyList: any = [];
  public agencyFilterCtrl: FormControl = new FormControl();
  public agencies: any = [];
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
      transaction_id: [],
      status_code: [],
      source_name: [],
      source_mobile: [],
      receive_name: [],
      receive_mobile: [],
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
    // this.subMerchantList = [];
    // this.commonService.GetListBoxData("master_merchants").subscribe((data) => {
    //   if (data.error_code === "00") {
    //     this.merchantList = data.list_data;
    //     this.merchants = Object.assign([], this.merchantList);
    //   }
    // });
    // this.commonService

    this.commonService
      .getListStatusData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data.error_code === "00") {
          this.statusList = data.list_data;
        }
      });
    //   .GetListBoxData("transaction_payment_method")
    //   .subscribe((data) => {
    //     if (data.error_code === "00") {
    //       this.paymentMethodList = data.list_data;
    //     }
    //   });
    // this.commonService.GetListBoxData("agency").subscribe((data) => {
    //   if (data.error_code === "00") {
    //     this.agencyList = data.list_data;
    //     this.agencies = Object.assign([], this.agencyList);
    //   }
    // });
    // this.commonService
    //   .GetListBoxData("issuer_transaction")
    //   .subscribe((data) => {
    //     if (data.error_code === "00") {
    //       this.issuerList = data.list_data;
    //       this.issuers = Object.assign([], this.issuerList);
    //     }
    //   });
    // this.commonService
    //   .GetListBoxData("transaction_channel")
    //   .subscribe((data) => {
    //     if (data.error_code === "00") {
    //       this.channelList = data.list_data;
    //     }
    //   });
    this.onValueChange();
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
    this.merchantFilterCtrl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((val) => {
        this.merchants = val ? this.filterMerchant(val) : this.merchantList;
      });
    this.agencyFilterCtrl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((val) => {
        this.agencies = val ? this.filterAgency(val) : this.agencyList;
      });
    this.issuerFilterCtrl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((val) => {
        this.issuers = val ? this.filterIssuer(val) : this.issuerList;
      });
  }

  private filterMerchant(value: string) {
    const filterValue = value?.trim().toLowerCase();
    return this.merchantList.filter(
      (i) =>
        i.desc &&
        (this.commonService.searchLike(i.desc).includes(filterValue) ||
          i.desc.toLowerCase().includes(filterValue))
    );
  }

  private filterSubMerchant(value: string) {
    const filterValue = value.trim().toLowerCase();
    return this.subMerchantList.filter(
      (i) =>
        i.desc &&
        (this.commonService.searchLike(i.merchant_name).includes(filterValue) ||
          i.merchant_name.toLowerCase().includes(filterValue))
    );
  }

  private filterAgency(value: string) {
    const filterValue = value?.trim().toLowerCase();
    return this.agencyList.filter(
      (i) =>
        i.desc &&
        (this.commonService.searchLike(i.desc).includes(filterValue) ||
          i.desc.toLowerCase().includes(filterValue))
    );
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

  changeMerchant(event) {
    if (event.value) {
      this.merchantService
        .getSubMerchantList(event.value)
        .subscribe((data: any) => {
          if (
            (data.error_code === "00" || data.error_code === "02") &&
            data.total_record > 0
          ) {
            this.f.merchant_id.enable();
            this.subMerchantList = data.list_data;
            this.subMerchants = Object.assign([], this.subMerchantList);
            this.subMerchantFilterCtrl.valueChanges
              .pipe(distinctUntilChanged())
              .subscribe((val) => {
                this.subMerchants = val
                  ? this.filterSubMerchant(val)
                  : this.subMerchantList;
              });
          } else {
            this.subMerchantList = [];
            this.subMerchants = [];
            this.f.merchant_id.disable();
          }
        });
    } else {
      this.f.merchant_id.disable();
      this.subMerchantList = [];
      this.subMerchants = [];
    }
  }

  fromDateChange(value: any) {
    if (value !== null) {
      const to = this.f.to_date.value;
      if (to && this.compare(value, to) === 1) {
        this.f.from_date.setValue(to);
      } else if (!to && this.compare(value, new Date()) === 1) {
        this.f.from_date.setValue(new Date());
      }
      this.minToDate = this.f.from_date.value;
    } else {
      this.minToDate = null;
    }
  }

  toDateChange(value: any) {
    if (value !== null) {
      if (this.compare(value, new Date()) === 1) {
        this.f.to_date.setValue(new Date());
      }
      const to = this.f.to_date.value;
      const from = this.f.from_date.value;
      if (from && this.compare(from, to) === 1) {
        this.f.to_date.setValue(from);
      }
      this.maxFromDate = this.f.to_date.value;
    } else {
      this.maxFromDate = new Date();
    }
  }

  keyPressDate(event) {
    const k = event.keyCdateChangeode;
    return k === 8 || k === 191 || (k >= 47 && k <= 57);
  }

  isInvalidDate(event, field) {
    if (event.target.value === "Invalid date") {
      this.f[field].setValue(null);
    }
  }

  compare(d1, d2) {
    const format = CommonConstants.DATE_FORMAT_DATEPICKER;
    const m1 = moment(d1, format);
    const m2 = moment(d2, format);
    if (m1 > m2) {
      return 1;
    } else if (m1 < m2) {
      return -1;
    } else {
      return 0;
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

      console.log("setDataFromParams raw", data.from_date);

      this.f.from_date.setValue(new Date(this.convertDate(data.from_date)));

      console.log(
        "setDataFromParams covert",
        new Date(this.convertDate(data.from_date))
      );
    }
    if (data.to_date) {
      this.searchRequest.to_date = data.to_date;
      this.f.to_date.setValue(new Date(this.convertDate(data.to_date)));
    }
    if (data.transaction_id) {
      this.searchRequest.transaction_id = data.transaction_id.trim();
      this.f.transaction_id.setValue(data.transaction_id.trim());
    }
    if (data.status_code) {
      this.searchRequest.status_code = data.status_code;
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
  }

  public searchData() {
    const form = this.searchForm.value;
    this.page = 1;
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
    if (form.transaction_id) {
      this.searchRequest.transaction_id = form.transaction_id.trim();
    }
    if (form.status_code) {
      this.searchRequest.status_code = form.status_code;
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
      .getTransactionPayment(request)
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
      .getTransactionPayment(this.searchRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data.error_code === "00" || data.error_code === "02") {
          const date = moment().format("DDMMYYhhmm");
          const title = this.getTranslation("transaction.payment.title");
          const header = [
            this.getTranslation("transaction.payment.data_table.no"),
            this.getTranslation("transaction.payment.data_table.trans_id"),
            this.getTranslation("transaction.payment.data_table.amount"),
            this.getTranslation("transaction.payment.data_table.partner_ref"),

            this.getTranslation("transaction.payment.data_table.source_acc"),
            this.getTranslation("transaction.payment.data_table.source_name"),
            this.getTranslation("transaction.payment.data_table.receive_acc"),
            this.getTranslation("transaction.payment.data_table.receive_name"),

            this.getTranslation("transaction.payment.data_table.trans_status"),
            this.getTranslation("transaction.payment.data_table.content"),
            this.getTranslation("transaction.payment.data_table.created_date"),
          ];
          const exportData = [];
          data.list_data?.forEach((e, i) => {
            exportData.push([
              "" + (i + 1),
              e.id,
              this.decimalPipe.transform(e.amount, "1.0-2"),
              e.partnerReference,

              e.sourceInfo?.username,
              e.sourceInfo?.fullname,
              e.receiverInfo?.username,
              e.receiverInfo?.fullname,

              this.getTranslation("transaction.payment.statusList." + e.status),
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
            { width: 30 },
            { width: 15 },
            { width: 35 },

            { width: 20 },
            { width: 20 },
            { width: 20 },
            { width: 20 },

            { width: 25 },
            { width: 40 },
            { width: 20 },
          ];

          // Generate excel file with given name
          workbook.xlsx.writeBuffer().then((res) => {
            const blob = new Blob([res], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            fs.saveAs(
              blob,
              this.getTranslation("transaction.payment.file-name") +
                date +
                ".xlsx"
            );
          });
        }
      });
  }

  viewDetail(item) {
    if (this.checkPermission(20102)) {
      this.router.navigateByUrl("/admin/transaction-payment/detail/" + item.id);
    }
  }

  getTranslation(key) {
    return this.translateService.instant(key);
  }

  checkPermission(key) {
    return this.authService.checkPermission(key);
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
