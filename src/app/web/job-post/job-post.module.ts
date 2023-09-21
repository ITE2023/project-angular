import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobPostComponent } from './job-post.component';
import { BsDatepickerModule, BsLocaleService, defineLocale, enGbLocale, viLocale } from 'ngx-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { LocalStorageType, TitleConstants } from '@core/constants';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IConfig } from 'ngx-mask';


defineLocale("vi", viLocale);
defineLocale("en", enGbLocale);



export let options: Partial<IConfig> | (() => Partial<IConfig>);

const routes: Routes = [
  {
    path: "",
    resolve: {},
    children: [
      {
        path: "",
        component: JobPostComponent,
        data: {
          title: TitleConstants.MANAGE_JOP_POST,
        },
      },
    ],
  },
];
@NgModule({
  declarations: [JobPostComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class JobPostModule {
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
