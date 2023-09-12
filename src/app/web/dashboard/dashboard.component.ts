import { Component, OnDestroy, OnInit } from "@angular/core";
import { DashboardService } from "@core/services";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DecimalPipe } from "@angular/common";
@Component({
  selector: "ite-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  providers: [DecimalPipe],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public formatDate = "DD/MM/YYYY HH:mm:ss";
  public isDay = true;
  public isWeek = false;
  public isMonth = false;
  public ispDay = true;
  public ispWeek = false;
  public ispMonth = false;
  public isrDay = true;
  public isrWeek = false;
  public isrMonth = false;
  public loading = true;

  public activeLoading = true;
  public onlineLoading = true;

  public revenueToday: any;
  public revenueMonth: any;
  public refundToday: any;

  public topWalletChartData: any = [];
  public topWalletChartLabel: any = [];

  public activeWalletData: any = [];
  public activeWalletLabel: any = [];
  public activeWalletTable = [];
  public total_active_wallet: any;

  public onlineWalletData: any = [];
  public onlineWalletLabel: any = [];
  public onlineWalletTable = [];
  public total_online_wallet: any;

  public lstTrans = [];
  public transLoading = true;
  public t1 = "day";
  public t2 = "day";
  public t3 = "day";

  public selectedColChart = 0;
  public colChartList = [
    {
      index: 0,
      desc: "Số lượng giao dịch",
    },
    {
      index: 1,
      desc: "Giá trị giao dịch",
    },
  ];

  public destroy$: Subject<boolean> = new Subject();
  public isInitDone: boolean = false;

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private dashboardService: DashboardService,
    private toast: ToastrService,
    private decimalPipe: DecimalPipe
  ) {
    this.activeWalletData = [];
    this.activeWalletLabel = [];
    this.onlineWalletData = [];
    this.onlineWalletLabel = [];
    // thay đổi ngôn ngữ trong chart
    this.translateService.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log("onLangChange data", data);
        if (this.isInitDone) {
          this.changeColChart(this.t1);
          this.changeActiveChart(this.t2);
          this.changeOnlineChart(this.t3);
        }
      });
  }

  ngOnInit() {
    // this.getBusinessToday();
    this.getNewestTransaction();
    this.getTransactionOrScale("top_wallet", "day");
    this.getTransactionOrScale("active_wallet", "day");
    this.getTransactionOrScale("online_wallet", "day");

    this.isInitDone = true;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getBusinessToday() {
    const startToday = moment().startOf("day").format(this.formatDate);
    const currentTime = moment().format(this.formatDate);
    // this.dashboard
    //   .getBusinessToday({
    //     from_date: startToday,
    //     to_date: currentTime,
    //     key: "pay",
    //   })
    //   .subscribe((data) => {
    //     if (data.error_code === "00" || data.error_code === "02") {
    //       this.revenueToday = data.list_data ? data.list_data[0].sum_amount : 0;
    //     }
    //   });
    // this.dashboard
    //   .getBusinessToday({
    //     from_date: moment().startOf("month").format(this.formatDate),
    //     to_date: currentTime,
    //     key: "pay",
    //   })
    //   .subscribe((data) => {
    //     if (data.error_code === "00" || data.error_code === "02") {
    //       this.revenueMonth = data.list_data ? data.list_data[0].sum_amount : 0;
    //     }
    //   });
    // this.dashboard
    //   .getBusinessToday({
    //     from_date: startToday,
    //     to_date: currentTime,
    //     key: "refund",
    //   })
    //   .subscribe((data) => {
    //     if (data.error_code === "00" || data.error_code === "02") {
    //       this.refundToday = data.list_data ? data.list_data[0].sum_amount : 0;
    //     }
    //   });
  }

  getTransactionOrScale(typeChart, time) {
    let from = "";
    let to = "";
    const currentTime = moment().format(this.formatDate);
    switch (time) {
      case "day":
        from = moment().startOf("day").format(this.formatDate);
        to = currentTime;
        break;
      case "week":
        from = moment().startOf("week").add("d", 1).format(this.formatDate);
        to = currentTime;
        break;
      case "month":
        from = moment().startOf("month").format(this.formatDate);
        to = currentTime;
        break;
    }
    const rq: any = {
      from_date: from,
      to_date: to,
    };

    if (typeChart === "top_wallet") {
      this.topWalletChartLabel = [];
      this.topWalletChartData = [];

      if (this.selectedColChart == 0) {
        // total
        rq.type = "top_trans";

        this.dashboardService
          .getTopTrans(rq)
          .pipe(takeUntil(this.destroy$))
          .subscribe((res) => {
            if (res.error_code === "00" || res.error_code === "02") {
              this.loading = false;
              const leftData = [];

              if (
                res.list_data?.length &&
                this.topWalletChartLabel.length === 0
              ) {
                res.list_data.forEach((item, index) => {
                  if (item.id) {
                    this.topWalletChartLabel.push(item.id.username);
                    leftData.push(item.total);
                  }
                });

                this.topWalletChartData = [
                  {
                    label: this.translateService.instant(
                      "dashboard-page.column_chart.unit_label_number"
                    ),
                    backgroundColor: "rgb(0,145,141,0.7)",
                    hoverBackgroundColor: "rgb(0,145,141,0.8)",
                    data: leftData,
                  },
                ];
              }
            }
          });
      } else {
        // amount
        rq.type = "top_value";

        this.dashboardService
          .getTopTrans(rq)
          .pipe(takeUntil(this.destroy$))
          .subscribe((res) => {
            if (res.error_code === "00" || res.error_code === "02") {
              this.loading = false;
              const leftData = [];

              if (
                res.list_data?.length &&
                this.topWalletChartLabel.length === 0
              ) {
                res.list_data.forEach((item, index) => {
                  if (item.id) {
                    this.topWalletChartLabel.push(item.id.username);
                    leftData.push(item.amount);
                  }
                });

                this.topWalletChartData = [
                  {
                    label: this.translateService.instant(
                      "dashboard-page.column_chart.unit_label_value"
                    ),
                    backgroundColor: "rgb(0,145,141,0.7)",
                    hoverBackgroundColor: "rgb(0,145,141,0.8)",
                    data: leftData,
                  },
                ];
              }
            }
          });
      }

      // this.dashboard.getRevenue(rq).subscribe((data) => {
      //   this.loading = false;
      //   if (data.error_code === "00" || data.error_code === "02") {
      //     const leftData = [];
      //     const rightData = [];
      //     data.list_data?.forEach((item) => {
      //       this.topWalletChartLabel.push(item.statistic_day);
      //       leftData.push(item.amount_transaction_success);
      //       rightData.push(item.transaction_success);
      //     });
      //     this.topWalletChartData = [
      //       {
      //         type: "line",
      //         label: this.translateService.instant(
      //           "dashboard-page.revenue-chart.value"
      //         ),
      //         yAxisID: "y-axis-0",
      //         backgroundColor: "rgb(236,131,45,0.7)",
      //         borderColor: "rgb(236,131,45,0.7)",
      //         fillColor: "rgb(236,131,45,0.7)",
      //         strokeColor: "rgb(236,131,45,0.7)",
      //         hoverBackgroundColor: "rgb(236,131,45,0.8)",
      //         data: leftData,
      //         pointRadius: 4,
      //         pointHoverRadius: 6,
      //       },
      //       {
      //         type: "bar",
      //         label: this.translateService.instant(
      //           "dashboard-page.revenue-chart.amount"
      //         ),
      //         yAxisID: "y-axis-1",
      //         backgroundColor: "rgb(0,145,141,0.7)",
      //         hoverBackgroundColor: "rgb(0,145,141,0.8)",
      //         data: rightData,
      //       },
      //     ];
      //   }
      // });
    }

    if (typeChart === "active_wallet") {
      rq.key = "status";
      this.activeWalletLabel = [];
      this.activeWalletData = [];

      this.dashboardService
        .getWalletScale(rq)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          this.activeLoading = false;
          if (res.error_code === "00" || res.error_code === "02") {
            this.activeWalletTable = res.list_data;
            this.total_active_wallet = res.summary;
            const length = res.list_data?.length;
            if (length && this.activeWalletLabel.length === 0) {
              console.log(
                "getWalletScale activeWalletLabel",
                this.activeWalletLabel
              );

              res.list_data?.forEach((item, index) => {
                this.activeWalletLabel.push(
                  this.translateService.instant(
                    "dashboard-page.circle_chart.data_table.wallet_status.active." +
                      item.status
                  )
                );
                this.activeWalletData.push(
                  this.decimalPipe.transform(item.ratio, "1.0-2")
                );
              });
            }
          }
        });
    }

    if (typeChart === "online_wallet") {
      rq.key = "active_status";
      this.onlineWalletLabel = [];
      this.onlineWalletData = [];

      this.dashboardService
        .getWalletScale(rq)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          this.onlineLoading = false;
          if (res.error_code === "00" || res.error_code === "02") {
            this.onlineWalletTable = res.list_data;
            this.total_online_wallet = res.summary;
            const length = res.list_data?.length;
            if (length && this.onlineWalletLabel.length === 0) {
              console.log(
                "getWalletScale onlineWalletLabel",
                this.onlineWalletLabel
              );
              res.list_data?.forEach((item, index) => {
                this.onlineWalletLabel.push(
                  this.translateService.instant(
                    "dashboard-page.circle_chart.data_table.wallet_status.online." +
                      item.status
                  )
                );
                this.onlineWalletData.push(
                  this.decimalPipe.transform(item.ratio, "1.0-2")
                );
              });
            }
          }
        });
    }
  }

  changeColChart(time: string) {
    this.loading = true;
    this.t1 = time;
    switch (time) {
      case "day": {
        this.isDay = true;
        this.isWeek = false;
        this.isMonth = false;
        break;
      }
      case "week": {
        this.isDay = false;
        this.isWeek = true;
        this.isMonth = false;
        break;
      }
      case "month": {
        this.isDay = false;
        this.isWeek = false;
        this.isMonth = true;
        break;
      }
    }
    this.getTransactionOrScale("top_wallet", time);
  }

  changeActiveChart(time: string) {
    this.activeLoading = true;
    this.t2 = time;
    this.getTransactionOrScale("active_wallet", time);
  }

  changeOnlineChart(time: string) {
    this.onlineLoading = true;
    this.t3 = time;
    // switch (time) {
    //   case "day": {
    //     this.isrDay = true;
    //     this.isrWeek = false;
    //     this.isrMonth = false;
    //     break;
    //   }
    //   case "week": {
    //     this.isrDay = false;
    //     this.isrWeek = true;
    //     this.isrMonth = false;
    //     break;
    //   }
    //   case "month": {
    //     this.isrDay = false;
    //     this.isrWeek = false;
    //     this.isrMonth = true;
    //     break;
    //   }
    // }
    this.getTransactionOrScale("online_wallet", time);
  }

  getNewestTransaction() {
    const request = {};
    this.dashboardService
      .getNewestTransaction(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data.error_code === "00" || data.error_code === "02") {
          this.transLoading = false;
          this.lstTrans = data.list_data ? data.list_data : [];
        }
      });
  }

  seeMore() {
    this.router.navigate(["admin", "transaction-payment"]);
  }

  changeColChartSection(event) {
    this.selectedColChart = event.value;
    this.getTransactionOrScale("top_wallet", this.t1);
  }
}
