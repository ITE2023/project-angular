import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'ite-bar-chart',
  templateUrl: './bar-chart.component.html'
})
export class BarChartComponent implements OnInit {

  @Input() chartLabels: Label[];
  @Input() chartData: ChartDataSets[] = [];
  @Input() loading;
  @Input() chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function (value) {
            if (typeof value === "number") {
              return value.toLocaleString('en-GB');
            } else {
              return value;
            }
          }
        }
      }]
    },
    tooltips: {
      // callbacks: {
      //   label: function (tooltipItem) {
      //   }
      // }
    }
    // legend: {
    //   position: 'top',
    //   labels: {
    //     usePointStyle: true,
    //   },
    // },
  };
  @Input() barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartColors: Color[] = [
    { backgroundColor: 'rgb(0,145,141,0.7)', hoverBackgroundColor: "rgb(0,145,141,0.8)", },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
