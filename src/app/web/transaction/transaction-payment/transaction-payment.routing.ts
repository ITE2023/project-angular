import { Routes } from "@angular/router";
import { TransactionPaymentComponent } from "./transaction-payment.component";
import { PaymentDetailComponent } from "./payment-detail/payment-detail.component";
import { TitleConstants } from "@core/constants";

export const routing: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: TransactionPaymentComponent,
        data: {
          title: TitleConstants.TRANSACTION_PAYMENT,
        },
      },
      {
        path: "detail/:id",
        component: PaymentDetailComponent,
        data: { title: TitleConstants.TRANSACTION_PAYMENT_DETAIL },
      },
    ],
  },
];
