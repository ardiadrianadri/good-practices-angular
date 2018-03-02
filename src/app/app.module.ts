import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { SearchModule } from './search/search.module';
import { DetailsModule } from './details/details.module';
import { CoreModule } from './core/core.module';

/**
 * Main module of the app
 *
 * @export
 * @class AppModule
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    SearchModule,
    DetailsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
