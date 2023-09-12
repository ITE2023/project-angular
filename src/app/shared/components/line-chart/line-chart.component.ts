import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'ite-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() chartData: ChartDataSets[] = [];
  @Input() chartLabels: Label[] = [];
  @Input() loading;
  @Input() chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        fill: false,
        tension: 0
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 8,
          stepSize: 1,
          callback: function (value) {
            if (typeof value === "number") {
              return value.toLocaleString('en-GB');
            } else {
              return value;
            }
          }
        }
      }],
    },
    // tooltips: {
    //   callbacks: {
    //     label: function (tooltipItem) {
    //       return Number(tooltipItem.yLabel).toLocaleString('en-GB');
    //     }
    //   }
    // }
  };
  public chartColors: Color[] = [];
  public chartLegend = true;
  public chartType = 'line';
  public chartPlugins = [];
  @Input() page = '';

  constructor() {
  }

  ngOnInit(): void {
    if (this.page === 'monitor') {
      this.chartOptions.tooltips = {
        callbacks: {
          title: function (tooltipItem) {
            return tooltipItem[0].xLabel[0] + " - " + tooltipItem[0].xLabel[1];
          }
        }
      }
    }
  }
}
