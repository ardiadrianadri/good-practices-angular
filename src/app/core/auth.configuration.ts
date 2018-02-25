import { InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { AuthToken } from './auth-token';

export const AUTH_CONFIGURATION: InjectionToken<Observable<AuthToken>> =
new InjectionToken<Observable<AuthToken>>('AUTH_CONFIGURATION');

export function authConfiguration(http: HttpClient): Observable<AuthToken> {
  const configAuthToken = '/assets/marvel-tokens-dev.json'

  return http.get<AuthToken>(configAuthToken);
}
