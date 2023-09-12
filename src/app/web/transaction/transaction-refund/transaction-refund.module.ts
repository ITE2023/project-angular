import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionRefundComponent } from './transaction-refund.component';
import { RefundDetailComponent } from './refund-detail/refund-detail.component';
import { RouterModule } from '@angular/router';
import { routing } from './transaction-refund.routing';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { FormsModule } from '@angular/forms';

import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { viLocale, enGbLocale } from 'ngx-bootstrap/locale';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageType } from '@core/constants';
import { ImportFileDialogComponent } from './import-file-dialog/import-file-dialog.component';
import { UpdateStatusDialogComponent } from './update-status-dialog/update-status-dialog.component';
import { UpdateStatusConfirmDialogComponent } from './update-status-confirm-dialog/update-status-confirm-dialog.component';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { ApproveRefundDialogComponent } from './approve-refund-dialog/approve-refund-dialog.component';
defineLocale('vi', viLocale);
defineLocale('en', enGbLocale);

@NgModule({
  declarations: [
    TransactionRefundComponent,
    RefundDetailComponent,
    ImportFileDialogComponent,
    UpdateStatusDialogComponent,
    UpdateStatusConfirmDialogComponent,
    ChangeStatusComponent,
    ApproveRefundDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    SharedModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
  ]
})
export class TransactionRefundModule {
  constructor(private bsLocaleService: BsLocaleService, private translate: TranslateService) {
    const lang = localStorage.getItem(LocalStorageType.CurrentLanguage);
    this.bsLocaleService.use(lang);
    this.translate.onLangChange.subscribe(data => {
      this.bsLocaleService.use(data.lang);
    });
  }
}
