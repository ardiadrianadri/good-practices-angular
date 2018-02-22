import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { HeroesSearchComponent } from './search.component';
import { searchRoute } from './search.routes';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([searchRoute])
  ],
  declarations: [
    HeroesSearchComponent
  ]
})
export class SearchModule {}
