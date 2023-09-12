import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionDirective, AccordionLinkDirective, AccordionAnchorDirective } from '.';
import { MenuItems } from '../models';
import { ImagePreloadDirective } from './image/image-preload.directive';
import { NumberOnlyDirective } from './common/number-only.directive';
import { PercentDirective } from './common/percent.directive';
import { AddCommaToNumberDirective } from './common/add-comma-to-number.directive';
import { NoSpecialCharacterDirective } from './common/no-special-character.directive';
import { FocusInvalidInputDirective } from './common/focus-invalid-input.directive';
import { TextNumberDirective } from './common/text-number.directive';

const DIRECTIVES = [
  AccordionDirective,
  AccordionAnchorDirective,
  AccordionLinkDirective,
  ImagePreloadDirective,
  NumberOnlyDirective,
  PercentDirective,
  AddCommaToNumberDirective,
  NoSpecialCharacterDirective,
  FocusInvalidInputDirective,
  TextNumberDirective
];

@NgModule({
  declarations: [
    ...DIRECTIVES
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ...DIRECTIVES,
    CommonModule
  ],
  providers: [MenuItems]
})
export class DirectivesModule { }
