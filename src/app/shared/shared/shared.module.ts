import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { DirectivesModule } from "src/app/core/directives/directives.module";
import { PipesModule } from "src/app/core/pipes/pipes.module";
import { TranslateModule } from "@ngx-translate/core";
import { DeviceDetectorModule } from "ngx-device-detector";
import { PaginationComponent } from "@core/components/pagination/pagination.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { NzTreeSelectModule } from "ng-zorro-antd/tree-select";
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { BarLineChartComponent } from '../components/bar-line-chart/bar-line-chart.component';
import { PieChartComponent } from '../components/pie-chart/pie-chart.component';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from '../components/bar-chart/bar-chart.component';
import { LineChartComponent } from "../components/line-chart/line-chart.component";

const MODULES = [
  ReactiveFormsModule,
  PipesModule,
  DirectivesModule,
  MaterialModule,
  TranslateModule,
  FormsModule,
  NgSelectModule,
  NgxMatSelectSearchModule,
  NzTreeSelectModule,
  NzTreeModule,
  ChartsModule
];

@NgModule({
  declarations: [PaginationComponent, BarChartComponent, BarLineChartComponent, PieChartComponent, LineChartComponent],
  imports: [...MODULES],
  exports: [
    HttpClientModule,
    ...MODULES,
    DeviceDetectorModule,
    PaginationComponent, BarChartComponent, BarLineChartComponent, PieChartComponent, LineChartComponent
  ],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
