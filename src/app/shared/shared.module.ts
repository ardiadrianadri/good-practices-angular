import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TitleComponent } from './title.component';
import { LoadingComponent } from './loading.component';

const SharedComponents = [
  TitleComponent,
  LoadingComponent
]

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ...SharedComponents
  ],
  exports: [
    CommonModule,
    ...SharedComponents
  ]
})
export class SharedModule {}
