import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'ite-pie-chart',
  templateUrl: './pie-chart.component.html',
})
export class PieChartComponent implements OnInit {

  @Input() chartLabels: Label[];
  @Input() chartData: SingleDataSet = [];
  @Input() loading;
  @Input() chartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      callbacks: {
        label(tooltipItem, data) {
          const index = tooltipItem.index;
          return data.labels[index] + ': ' + data.datasets[0].data[index] + '%';
        }
      }
    },
    legend: {
      position: 'right',
      // labels: {
      //   usePointStyle: true,
      // },
    },
  };
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
