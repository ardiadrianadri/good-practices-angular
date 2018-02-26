import { InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { MarvelEndPoints } from './marvel-endpoints';

/**
 * Token used to inject the URL of the Marvel API
*/
export const MARVEL_API_CONFIGURATION: InjectionToken<Observable<MarvelEndPoints>> =
new InjectionToken<Observable<MarvelEndPoints>>('MARVEL_API_CONFIGURATION');

/**
 * Constant used to identify where, in the url, should be placed the id of the Marvel element
*/
export const idExpr = '##id##';

/**
 * Factory used to get the list of URL of the Marvel API
 *
 * @export
 * @param {HttpClient} http - Service to do http request
 * @returns {Observable<MarvelEndPoints>} - Observable with the list of Marvel endpoints
 */
export function MarvelApiConfiguration (http: HttpClient): Observable<MarvelEndPoints> {
  const configEndpointsMarvel = '/assets/marvel-endpoints.json';

  return http.get<MarvelEndPoints>(configEndpointsMarvel);
}
