import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DetailComponent } from './details.component';
import { detailsRoute } from './details.router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([detailsRoute])
  ],
  declarations: [
    DetailComponent
  ]
})
export class DetailsModule {}
