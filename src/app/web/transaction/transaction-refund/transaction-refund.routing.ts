import { Routes } from "@angular/router";
import { TransactionRefundComponent } from "./transaction-refund.component";
import { RefundDetailComponent } from "./refund-detail/refund-detail.component";
import { TitleConstants } from "@core/constants";

export const routing: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: TransactionRefundComponent,
        data: {
          title: TitleConstants.TRANSACTION_REFUND,
        },
      },
      {
        path: "detail/:id",
        component: RefundDetailComponent,
        data: {
          title: TitleConstants.TRANSACTION_REFUND_DETAIL,
        },
      },
    ],
  },
];
