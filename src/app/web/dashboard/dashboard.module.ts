import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { Routes, RouterModule } from "@angular/router";
import { LocalStorageType, TitleConstants } from "src/app/core/constants";
import { SharedModule } from "src/app/shared/shared/shared.module";
import { FormsModule } from "@angular/forms";
import {
  BsDatepickerModule,
  DatepickerModule,
  BsLocaleService,
} from "ngx-bootstrap/datepicker";
import { TranslateService } from "@ngx-translate/core";
import { defineLocale } from "ngx-bootstrap/chronos";
import { viLocale, enGbLocale } from "ngx-bootstrap/locale";

defineLocale("vi", viLocale);
defineLocale("en", enGbLocale);

const routes: Routes = [
  {
    path: "",
    resolve: {},
    children: [
      {
        path: "",
        component: DashboardComponent,
        data: {
          title: TitleConstants.DASHBOARD,
        },
      },
    ],
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
  ],
})
export class DashboardModule {}
