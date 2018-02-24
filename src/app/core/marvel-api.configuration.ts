import { InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { MarvelEndPoints } from './marvel-endpoints';

export const MARVEL_API_CONFIGURATION: InjectionToken<Observable<MarvelEndPoints>> =
new InjectionToken<Observable<MarvelEndPoints>>('MARVEL_API_CONFIGURATION');

export const idExpr = '##id##';
export function MarvelApiConfiguration (http: HttpClient): Observable<MarvelEndPoints> {
  const configEndpointsMarvel = '/assets/marvel-endpoints.json';

  return http.get<MarvelEndPoints>(configEndpointsMarvel);
}
