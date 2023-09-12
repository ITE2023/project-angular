import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCurrencyPipe } from './currency.pipe';

const PIPES = [
  CustomCurrencyPipe
];

@NgModule({
  declarations: [...PIPES],
  imports: [
    CommonModule
  ],
  exports: [
    ...PIPES
  ]
})
export class PipesModule { }
