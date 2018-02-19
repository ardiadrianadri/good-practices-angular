import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeroesSearchComponent } from './search/search.component';
import { searchRoute } from './search/search.routes';
import { DetailComponent } from './details/details.component';
import { detailsRoute } from './details/details.router';

@NgModule({
  declarations: [
    AppComponent,
    HeroesSearchComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'heroes-search', pathMatch: 'full' },
      searchRoute,
      detailsRoute
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
