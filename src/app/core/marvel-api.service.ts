import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/map';

import { AuthParams } from './auth-params';
import { MarvelEndPoints } from './marvel-endpoints';
import { AuthService } from './auth.service';
import { Hero } from '../common/hero';
import { MarvelElements } from '../common/marvel-elements';
import { MarvelAnswer } from '../common/marvel-answer';

import { MARVEL_API_CONFIGURATION, idExpr } from './marvel-api.configuration';

/**
 * Service used to get the information of the Marvel characters from the Marvel API
 *
 * @export
 * @class MarvelApi
 */
@Injectable()
export class MarvelApi {
  /**
   * Private object with the list of API endpoints
   *
   * @private
   * @type {MarvelEndPoints}
   * @memberof MarvelApi
   */
  private _endpoints: MarvelEndPoints;

  /**
   * Creates an instance of MarvelApi.
   * @param {HttpClient} _http - Service to do http request
   * @param {AuthService} _auth - Service to get the authentication object
   * @param {Observable<MarvelEndPoints>} _marvelConfig$ - Observable with the list of endpoints
   * @memberof MarvelApi
   */
  constructor (
    private _http: HttpClient,
    private _auth: AuthService,
    @Inject(MARVEL_API_CONFIGURATION) private _marvelConfig$: Observable<MarvelEndPoints>
  ) {}

  /**
   * Private method to build the url with the authentication parameters
   *
   * @private
   * @param {string} url - Url where the authentication parameters should be added
   * @param {AuthParams} authParams - Object with the authentication parameters
   * @returns {string} - Url with the authentication parameters
   * @memberof MarvelApi
   */
  private _setAuthParams(url: string, authParams: AuthParams): string {
    return (url.indexOf('?') < 0) ?
      `${url}?ts=${authParams.ts}&apikey=${authParams.apikey}&hash=${authParams.hash}` :
      `${url}&ts=${authParams.ts}&apikey=${authParams.apikey}&hash=${authParams.hash}`;
  }

  /**
   * Private method to add the pagination parameters
   *
   * @private
   * @param {string} url - Url where the pagination parameters should be added
   * @param {number} limit - Maximum number of results in the request
   * @param {number} offset - Number of result that should be ignored
   * @returns {string} - Url with the pagination parameters added
   * @memberof MarvelApi
   */
  private _setPageParams(url: string, limit: number, offset: number): string {
    return (url.indexOf('?') < 0) ?
      `${url}?limit=${limit}&offset=${offset}` :
      `${url}&limit=${limit}&offset=${offset}`;
  }

  /**
   * Private method to build the object with the result of the http request
   *
   * @private
   * @param {(Hero[] | MarvelElements[])} data - List of elements retrieved from the Marvel API
   * @param {*} answerData - Object with the pagination data from the Marvel API
   * @returns {MarvelAnswer} - Object return as result of each http request
   * @memberof MarvelApi
   */
  private _buildMarvelAnswer (data: Hero[] | MarvelElements[], answerData: any): MarvelAnswer {
    return {
      limit: answerData.limit,
      offset: answerData.offset,
      total: answerData.total,
      count: answerData.count,
      result: data
    };
  }

  /**
   * Method used to remove the empty results of the Marvel API
   *
   * @private
   * @param {(MarvelElements | Hero)} data - One result of the Marvel API
   * @returns {boolean} - Return true if the element is empty
   * @memberof MarvelApi
   */
  private _filterEmptyResults (data: MarvelElements | Hero): boolean {
    let result: boolean;
    let marvelElement: MarvelElements;
    let marvelHero: Hero;

    if ('title' in data) {
      marvelElement = (data as MarvelElements);
      result = ((marvelElement.title !== '') || (marvelElement.description !== ''));
    } else {
      marvelHero = (data as Hero);
      result = ((marvelHero.name !== '') || (marvelHero.description !== ''));
    }

    return result;
  }

  /**
   * Method used to get a list of Marvel characters
   *
   * @param {string} name - Partial name of the Marvel character
   * @param {number} limit - Maximum number of results in the request
   * @param {number} offset - Number of results ignored
   * @returns {Observable<MarvelAnswer>} - Observable with the result of the API request
   * @memberof MarvelApi
   */
  public getListHeroes(name: string, limit: number, offset: number): Observable<MarvelAnswer> {
    return this._marvelConfig$
    .concatMap((endpoints: MarvelEndPoints) => {
      this._endpoints = endpoints;
      return this._auth.getAuthParams();
    })
    .concatMap ((authPraams: AuthParams) => {
      let finalUrl = this._setAuthParams(this._endpoints.searchCharacter, authPraams);
      finalUrl = `${finalUrl}&nameStartsWith=${name}`;
      finalUrl = this._setPageParams(finalUrl, limit, offset);
      return this._http.get(finalUrl);
    })
    .map((answer: any) => {
      const heroes: Hero[] = answer.data.results.map((marvelHero: any) => {
        const hero: Hero = {
          id: marvelHero.id,
          name: marvelHero.name,
          description: marvelHero.description,
          image: `${marvelHero.thumbnail.path}.${marvelHero.thumbnail.extension}`
        };
        return hero;
      })
      .filter((hero: Hero) => this._filterEmptyResults(hero));

      return this._buildMarvelAnswer(heroes, answer.data);
    });
  }

  /**
   * Method used to get the details of one Marvel character
   *
   * @param {string} id - Id of the character
   * @returns {Observable<MarvelAnswer>} - Result of the API request
   * @memberof MarvelApi
   */
  public getDetailsHero(id: string): Observable<MarvelAnswer> {
    return this._marvelConfig$
    .concatMap((endpoints: MarvelEndPoints) => {
      this._endpoints = endpoints;
      return this._auth.getAuthParams();
    })
    .concatMap((authParams: AuthParams) => {
      let finalUrl = this._endpoints.detailsCharacter.replace(idExpr, id);
      finalUrl = this._setAuthParams(finalUrl, authParams);

      return this._http.get(finalUrl);
    })
    .map((answer: any) => {
      const hero: Hero = {
        id: answer.data.results[0].id,
        name: answer.data.results[0].name,
        description: answer.data.results[0].description,
        image: `${answer.data.results[0].thumbnail.path}.${answer.data.results[0].thumbnail.extension}`
      };

      return this._buildMarvelAnswer([hero], answer.data);
    });
  }

  /**
   * Method to get the list of Marvel comics of one character
   *
   * @param {string} id - Id of the Marvel character
   * @param {number} limit - Maximum number of results
   * @param {number} offset - Number of results ignored
   * @returns {Observable<MarvelAnswer>} - Answer from the API request
   * @memberof MarvelApi
   */
  public getListComics(id: string, limit: number, offset: number): Observable<MarvelAnswer> {
    return this._marvelConfig$
    .concatMap((endpoints: MarvelEndPoints) => {
      this._endpoints = endpoints;
      return this._auth.getAuthParams();
    })
    .concatMap((authParams: AuthParams) => {
      let finalUrl = this._endpoints.comicsCharacter.replace(idExpr, id);
        finalUrl = this._setAuthParams(finalUrl, authParams);
        finalUrl = this._setPageParams(finalUrl, limit, offset);

        return this._http.get(finalUrl);
      })
      .map ((answer: any) => {
        const comics: MarvelElements[] = answer.data.results.map((marvelComic: any) => {
          const comic: MarvelElements = {
            id: marvelComic.id,
            title: marvelComic.title,
            description: marvelComic.description
          };

          return comic;
        })
        .filter((comic: MarvelElements) => this._filterEmptyResults(comic));

        return this._buildMarvelAnswer(comics, answer.data);
      });
  }

  /**
   * Method to get the list of Marvel series of one character
   *
   * @param {string} id - Id of the Marvel character
   * @param {number} limit - Maximum number of result in the request
   * @param {number} offset - Number of results ignored
   * @returns {Observable<MarvelAnswer>} - Observable with answer from the Marvel API
   * @memberof MarvelApi
   */
  public getListSeries(id: string, limit: number, offset: number): Observable<MarvelAnswer> {
    return this._marvelConfig$
    .concatMap((endpoints: MarvelEndPoints) => {
      this._endpoints = endpoints;
      return this._auth.getAuthParams();
    })
    .concatMap((authParams: AuthParams) => {
      let finalUrl = this._endpoints.seriesCharacter.replace(idExpr, id);
      finalUrl = this._setAuthParams(finalUrl, authParams);
      finalUrl = this._setPageParams(finalUrl, limit, offset);

      return this._http.get(finalUrl);
    })
    .map ((answer: any) => {
      const series: MarvelElements[] = answer.data.results.map((marvelSerie: any) => {
        const serie: MarvelElements = {
          id: marvelSerie.id,
          title: marvelSerie.title,
          description: marvelSerie.description
        };

        return serie;
      })
      .filter((serie: MarvelElements) => this._filterEmptyResults(serie));

      return this._buildMarvelAnswer(series, answer.data);
    });
  }
}
