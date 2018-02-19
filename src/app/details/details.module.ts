import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { DetailComponent } from './details.component';
import { detailsRoute } from './details.router';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([detailsRoute])
  ],
  declarations: [
    DetailComponent
  ]
})
export class DetailsModule {}
