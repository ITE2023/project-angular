import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared/shared.module";
import { ProfileComponent } from "../core/components/profile/profile.component";
import { NotificationListComponent } from "@core/layout/topbar/notification/notification-list/notification-list.component";
import { TitleConstants, LocalStorageType } from "@core/constants";
import { NotificationDetailComponent } from "@core/layout/topbar/notification/notification-detail/notification-detail.component";

const defaultUrl = localStorage.getItem(LocalStorageType.DefaultUrl)
  ? localStorage.getItem(LocalStorageType.DefaultUrl)
  : "/login";

const routes: Routes = [
  {
    path: "",
    redirectTo: defaultUrl,
    pathMatch: "full",
  },
  {
    path: "admin",
    children: [
      { path: "", redirectTo: defaultUrl, pathMatch: "full" },
      // Dashboard
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
        data: { preload: true },
      },

      // transaction
      {
        path: "transaction-payment",
        loadChildren: () =>
          import(
            "./transaction/transaction-payment/transaction-payment.module"
          ).then((m) => m.TransactionPaymentModule),
        data: { preload: true },
      },
      {
        path: "transaction-refund",
        loadChildren: () =>
          import(
            "./transaction/transaction-refund/transaction-refund.module"
          ).then((m) => m.TransactionRefundModule),
        data: { preload: true },
      },
      // job post
      {
        path: "job-post",
        loadChildren: () =>
          import(
            "./job-post/job-post.module"
          ).then((m) => m.JobPostModule),
        data: { preload: true },
      },
    ],
  },
  {
    path: "profile",
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  declarations: [
    ProfileComponent,
    NotificationListComponent,
    NotificationDetailComponent,
  ],
})
export class WebModule {}
