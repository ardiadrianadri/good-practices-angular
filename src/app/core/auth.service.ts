import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Md5 } from 'ts-md5/dist/md5';

import { AuthToken } from './auth-token';
import { AuthParams } from './auth-params';

@Injectable()
export class AuthService {

  private _authToken: AuthToken;

  constructor () {
    this._authToken = {
      marvelPublicKey: '<Your public key from marvel account>',
      marvelPrivateKey: '<Your private key from marvel account>'
    };
  }

  public getAuthParams (): Observable<AuthParams> {
    let ts: string;
    let hash: string;
    let apikey: string;
    const finalUrl = '';

    const md5: Md5 = new Md5();

    ts = new Date().getTime().toString();
    apikey = this._authToken.marvelPublicKey;

    md5.appendStr(ts);
    md5.appendStr(this._authToken.marvelPrivateKey);
    md5.appendStr(this._authToken.marvelPublicKey);

    hash = md5.end().toString();

    return Observable.of({
      ts: ts,
      apikey: apikey,
      hash: hash
    });
  }
}
