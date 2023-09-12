import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterceptorModule } from 'src/app/core/interceptors/interceptor.module';
import { BackgroundLoader } from 'src/app/core/services';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InterceptorModule
  ]
})
export class ServicesModule {
  static forRoot() {
    return {
      ngModule: ServicesModule,
      providers: [
        BackgroundLoader,
      ]
    };
  }
}
