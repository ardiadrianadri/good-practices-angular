import { Injectable, Inject } from "@angular/core";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { Md5 } from "ts-md5/dist/md5";

import { AuthToken } from "./auth-token";
import { AuthParams } from './auth-params';
import { AUTH_CONFIGURATION } from "./auth.configuration";

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_CONFIGURATION) private _authConfig: Observable<AuthToken>
  ) {}

  public getAuthParams(): Observable<AuthParams> {
    return this._authConfig
    .map((authToken: AuthToken) => {
      let ts: string;
      let hash: string;
      let apikey: string;
      let finalUrl: string;

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
    });
  }
}
