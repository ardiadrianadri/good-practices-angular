import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TitleComponent } from './title.component';
import { LoadingComponent } from './loading.component';
import { TableComponent } from './table.component';

const SharedComponents = [
  TitleComponent,
  LoadingComponent,
  TableComponent
]

const SharedImports = [
  CommonModule,
  FormsModule
]

/**
 * Module for all the components which are used in two or more views
 *
 * @export
 * @class SharedModule
 */
@NgModule({
  imports: [
    ...SharedImports
  ],
  declarations: [
    ...SharedComponents
  ],
  exports: [
    ...SharedImports,
    ...SharedComponents
  ]
})
export class SharedModule {}
