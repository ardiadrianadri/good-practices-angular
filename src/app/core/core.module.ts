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

/**
 * Core module where the providers used in several components are injected
 *
 * @export
 * @class CoreModule
 */
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
  /**
   * Creates an instance of CoreModule. It is used to be sure that there is not more than one instance of the core module
   * @param {CoreModule} _parent - Possible second instance of the core module
   * @memberof CoreModule
   */
  constructor (@SkipSelf() @Optional() _parent: CoreModule) {
    if (_parent) {
      throw new Error('The core module can only be injected once');
    }
  }
}
