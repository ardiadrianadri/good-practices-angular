import {
  NgModule,
  SkipSelf,
  Optional
} from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';
import { MarvelApi } from './marvel-api.service';
import { MARVEL_API_CONFIGURATION, MarvelApiConfiguration } from './marvel-api.configuration';
import { AUTH_CONFIGURATION, authConfiguration } from './auth.configuration';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    { provide: AUTH_CONFIGURATION, useFactory: authConfiguration, deps: [HttpClient] },
    { provide: MARVEL_API_CONFIGURATION, useFactory: MarvelApiConfiguration, deps: [HttpClient] },
    AuthService,
    MarvelApi
  ]
})
export class CoreModule {
  constructor (@SkipSelf() @Optional() _parent: CoreModule) {
    if (_parent) {
      throw new Error('The core module can only be injected once');
    }
  }
}
