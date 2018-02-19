import {
  NgModule,
  SkipSelf,
  Optional
} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './auth.service';
import { MarvelApi } from './marvel-api.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
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
