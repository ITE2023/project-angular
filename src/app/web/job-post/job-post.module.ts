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
import { EditJobPostComponent } from './edit-job-post/edit-job-post.component';
import { routing } from "./job-post.routing";
import { QuillModule } from 'ngx-quill';
import { NgxPaginationModule } from 'ngx-pagination';

defineLocale("vi", viLocale);
defineLocale("en", enGbLocale);



export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [JobPostComponent, EditJobPostComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    SharedModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    QuillModule.forRoot({
      modules: {
        imageResize: {
          displaySize: true,
        },
      },
    }),
    NgxPaginationModule,
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
