import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroesSearchComponent } from './search.component';
import { searchRoute } from './search.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([searchRoute])
  ],
  declarations: [
    HeroesSearchComponent
  ]
})
export class SearchModule {}
