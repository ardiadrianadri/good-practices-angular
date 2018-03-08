import { InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { AuthToken } from './auth-token';

/**
 * Injection token used to inject the authentication configuration
*/
export const AUTH_CONFIGURATION: InjectionToken<Observable<AuthToken>> =
new InjectionToken<Observable<AuthToken>>('AUTH_CONFIGURATION');

/**
 * Factory to return the configuration of the authentication process
 *
 * @export
 * @param {HttpClient} http - Service to do http request
 * @returns {Observable<AuthToken>} - Observable with the configuration of the authentication process
 */
export function authConfiguration(http: HttpClient): Observable<AuthToken> {
  const configAuthToken = '/assets/marvel-tokens.json';

  return http.get<AuthToken>(configAuthToken);
}
