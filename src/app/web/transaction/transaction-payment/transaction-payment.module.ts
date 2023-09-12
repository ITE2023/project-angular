import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TransactionPaymentComponent } from "./transaction-payment.component";
import { PaymentDetailComponent } from "./payment-detail/payment-detail.component";
import { RouterModule } from "@angular/router";
import { routing } from "./transaction-payment.routing";
import { SharedModule } from "src/app/shared/shared/shared.module";
import { FormsModule } from "@angular/forms";
import { BsDatepickerModule, DatepickerModule } from "ngx-bootstrap/datepicker";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { defineLocale } from "ngx-bootstrap/chronos";
import { viLocale, enGbLocale } from "ngx-bootstrap/locale";
import { TranslateService } from "@ngx-translate/core";
import { LocalStorageType } from "@core/constants";
import { NgxMaskModule, IConfig } from "ngx-mask";
import { RefundDialogComponent } from "./refund-dialog/refund-dialog.component";
import { RefundResultDialogComponent } from "./refund-result-dialog/refund-result-dialog.component";
defineLocale("vi", viLocale);
defineLocale("en", enGbLocale);

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    TransactionPaymentComponent,
    PaymentDetailComponent,
    RefundDialogComponent,
    RefundResultDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    SharedModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    NgxMaskModule.forRoot(options),
  ],
})
export class TransactionPaymentModule {
  constructor(
    private bsLocaleService: BsLocaleService,
    private translate: TranslateService
  ) {
    const lang = localStorage.getItem(LocalStorageType.CurrentLanguage);
    this.bsLocaleService.use(lang);
    this.translate.onLangChange.subscribe((data) => {
      this.bsLocaleService.use(data.lang);
    });
  }
}
