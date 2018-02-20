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

@Injectable()
export class MarvelApi {

  private _endpoints: MarvelEndPoints;

  constructor (
    private _http: HttpClient,
    private _auth: AuthService,
    @Inject(MARVEL_API_CONFIGURATION) private _marvelConfig$: Observable<MarvelEndPoints>
  ) {}

  private _setAuthParams(url: string, authParams: AuthParams): string {
    return (url.indexOf('?') < 0) ?
      `${url}?ts=${authParams.ts}&apikey=${authParams.apikey}&hash=${authParams.hash}` :
      `${url}&ts=${authParams.ts}&apikey=${authParams.apikey}&hash=${authParams.hash}`
  }

  private _setPageParams(url: string, limit: number, offset: number): string {
    return (url.indexOf('?') < 0) ?
      `${url}?limit=${limit}&offset=${offset}` :
      `${url}&limit=${limit}&offset=${offset}`;
  }

  private _buildMarvelAnswer (data: Hero[] | MarvelElements[], answerData: any): MarvelAnswer {
    return {
      limit: answerData.limit,
      offset: answerData.offset,
      total: answerData.total,
      count: answerData.count,
      result: data
    };
  }

  private _filterEmptyResults (data: MarvelElements | Hero): boolean {
    let result: boolean;
    let marvelElement: MarvelElements;
    let marvelHero: Hero;

    if ('title' in data) {
      marvelElement = (data as MarvelElements);
      result = ((marvelElement.title !== '') && (marvelElement.description !== ''));
    } else {
      marvelHero = (data as Hero);
      result = ((marvelHero.name !== '') && (marvelHero.description !== ''));
    }

    return result;
  }

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
        }
        return hero;
      })
      .filter((hero: Hero) => this._filterEmptyResults(hero));

      return this._buildMarvelAnswer(heroes, answer.data);
    });
  }

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
      }

      return this._buildMarvelAnswer([hero], answer.data);
    });
  }

  public getListComics(id: string, limit: number, offset: number): Observable<MarvelAnswer> {
      return this._marvelConfig$
      .concatMap((endpoints: MarvelEndPoints) => {
        this._endpoints = endpoints;
        return this._auth.getAuthParams();
      })
      .concatMap((authParams: AuthParams) => {
        let finalUrl = this._endpoints.comicsCharacter.replace(idExpr,id);
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
          }

          return comic;
        })
        .filter((comic: MarvelElements) => this._filterEmptyResults(comic));

        return this._buildMarvelAnswer(comics, answer.data);
      });
  }

  public getListSeries(id: string, limit: number, offset: number): Observable<MarvelAnswer> {
    return this._marvelConfig$
    .concatMap((endpoints: MarvelEndPoints) => {
      this._endpoints = endpoints;
      return this._auth.getAuthParams();
    })
    .concatMap((authParams: AuthParams) => {
      let finalUrl = this._endpoints.seriesCharacter.replace(idExpr,id);
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
        }

        return serie;
      })
      .filter((serie: MarvelElements) => this._filterEmptyResults(serie));

      return this._buildMarvelAnswer(series, answer.data);
    });
  }
}
