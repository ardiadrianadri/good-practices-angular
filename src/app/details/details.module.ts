import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { DetailComponent } from './details.component';
import { detailsRoute } from './details.router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([detailsRoute])
  ],
  declarations: [
    DetailComponent
  ]
})
export class DetailsModule {}
