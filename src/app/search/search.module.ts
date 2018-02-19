import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { HeroesSearchComponent } from './search.component';
import { searchRoute } from './search.routes';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild([searchRoute])
  ],
  declarations: [
    HeroesSearchComponent
  ]
})
export class SearchModule {}
