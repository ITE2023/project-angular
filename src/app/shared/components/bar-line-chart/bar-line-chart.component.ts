import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'ite-bar-line-chart',
  templateUrl: './bar-line-chart.component.html'
})
export class BarLineChartComponent implements OnInit {

  @Input() chartLabels: Label[];
  @Input() chartData: ChartDataSets[] = [];
  @Input() loading;
  @Input() chartOptions: ChartOptions = {
    responsive: true,
    elements: {
      line: {
        fill: false
      }
    },
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [
        {
          display: true,
          position: "left",
          id: "y-axis-0",
          // scaleLabel: {
          //   display: true,
          //   labelString: 'USD',
          // },
          type: "linear",
          ticks: {
            beginAtZero: true,
            callback: function (value) {
              return Number(value).toLocaleString('en-GB');
            }
          }
        }, {
          position: "right",
          id: "y-axis-1",
          gridLines: {
            display: false
          },
          type: "linear",
          ticks: {
            beginAtZero: true,
            callback: function (value) {
              return Number(value).toLocaleString('en-GB');
            }
          }
        }]
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return Number(tooltipItem.yLabel).toLocaleString('en-GB');
        }
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  constructor() {
  }

  ngOnInit(): void {
  }
}
