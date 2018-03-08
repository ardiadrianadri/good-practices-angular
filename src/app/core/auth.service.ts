import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Md5 } from 'ts-md5/dist/md5';

import { AuthToken } from './auth-token';
import { AuthParams } from './auth-params';
import { AUTH_CONFIGURATION } from './auth.configuration';

/**
 * Service to manage the App authentication process in the Marvel API
 *
 * @export
 * @class AuthService
 */
@Injectable()
export class AuthService {

  /**
   * Creates an instance of AuthService.
   * @param {Observable<AuthToken>} _authConfig$ - Observable with the configuration parameters
   * @memberof AuthService
   */
  constructor(
    @Inject(AUTH_CONFIGURATION) private _authConfig$: Observable<AuthToken>
  ) {}

  /**
   * Method to get the authentication object
   *
   * @returns {Observable<AuthParams>} - Observable with the authentication Object
   * @memberof AuthService
   */
  public getAuthParams(): Observable<AuthParams> {
    return this._authConfig$
    .pipe(
      map((authToken: AuthToken) => {
      let ts: string;
      let hash: string;
      let apikey: string;
      const finalUrl = '';

      const md5: Md5 = new Md5();

      ts = new Date().getTime().toString();
      apikey = authToken.marvelPublicKey;

      md5.appendStr(ts);
      md5.appendStr(authToken.marvelPrivateKey);
      md5.appendStr(authToken.marvelPublicKey);

      hash = md5.end().toString();

      return {
        ts: ts,
        apikey: apikey,
        hash: hash
      };
    })
  );
  }
}
