import {
  Component,
  ModuleWithProviders
} from '@angular/core';
import { Routes } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import {HttpClient} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

interface AuthToken {
  marvelPublicKey: string;
  marvelPrivateKey: string;
}

interface Hero {
  id: string;
  name: string;
  description: string;
  image?: string;
}

interface MarvelElements {
  id: string;
  title: string;
  description: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'heroes-search',
  template: `
    <div class="page-title">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <h1>Search your favorite hero</h1>
        </div>
      </div>
    </div>
    <div class="loading" *ngIf="loading">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <h1 class="loading-banner">Loading...</h1>
        </div>
      </div>
    </div>
    <div class="search-form">
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <label for="input-name">Name of your favorite character</label>
          </div>
        </div>
        <div class="row">
          <div class="col-10">
            <input type="text" [(ngModel)]="heroName" name="input-name" class="form-control"/>
          </div>
          <div class="col-2">
            <button type="button" class="btn btn-primary" (click)="launchSearch()">Search</button>
          </div>
        </div>
      </div>
    </div>
    <div class="search-result"  *ngIf="heroesResult">
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <table class="table table-hover table-bordered table-results">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let hero of heroesResult" (click)="navDetails(hero.id)" class="clickable">
                  <td>{{hero.name}}</td>
                  <td>{{hero.description}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row justify-content-center">
          <button type="button" class="btn btn-secondary pag" (click)="setPage(0)">first</button>
          <button type="button" class="btn btn-secondary pag" (click)="setPage (actualPage - 1)">prev</button>
          <select [(ngModel)]="limit" class="form-control pag" (change)="setLimit()">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <button type="button" class="btn btn-secondary pag" (click)="setPage(actualPage + 1)">next</button>
          <button type="button" class="btn btn-secondary pag" (click)="setPage(lastPage)">last</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .table-results { margin-top: 10px; }
    .pag { margin: 0px 5px; }
    select.form-control.pag { width: 5%; }
    h1.loading-banner {
      margin-top: 10%;
      font-size: 100px;
      position: absolute;
      z-index: 9999;
      -webkit-animation:colorchange 20s infinite alternate;
    }

    tr.clickable { cursor: pointer; }

    @-webkit-keyframes colorchange {
      0% {
        color: blue;
      }
      10% {
        color: #8e44ad;
      }
      20% {
        color: #1abc9c;
      }
      30% {
        color: #d35400;
      }
      40% {
        color: blue;
      }
      50% {
        color: #34495e;
      }
      60% {
        color: blue;
      }
      70% {
        color: #2980b9;
      }
      80% {
        color: #f1c40f;
      }
      90% {
        color: #2980b9;
      }
      100% {
        color: pink;
      }
  `]
})
export class HeroesSearchComponent {

  private _configToken: AuthToken;
  private _url: string;

  public heroName: string;
  public limit = 10;
  public heroesResult: Hero[];
  public lastPage = 0;
  public actualPage = 0;
  public loading = false;


  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {

    this._configToken = {
      marvelPublicKey: '<Your public key from marvel account>',
      marvelPrivateKey: '<Your private key from marvel account>'
    };

    this._url = 'v1/public/characters';
  }

  private _formUrl() {
    let ts: string;
    let hash: string;
    let apikey: string;
    let finalUrl: string;

    const md5: Md5 = new Md5();

    ts = new Date().getTime().toString();
    apikey = this._configToken.marvelPublicKey;

    md5.appendStr(ts);
    md5.appendStr(this._configToken.marvelPrivateKey);
    md5.appendStr(this._configToken.marvelPublicKey);
    hash = md5.end().toString();

    finalUrl = `${this._url}?nameStartsWith=${this.heroName}&limit=${this.limit}&offset=${this.actualPage * this.limit}`;
    finalUrl = `${finalUrl}&ts=${ts}&hash=${hash}&apikey=${apikey}`;

    return finalUrl;
  }

  public launchSearch() {
    this.loading = true;
    this._http.get(this._formUrl())
    .subscribe(
      (answer: any) => {
        this.lastPage = Math.ceil(answer.data.total / this.limit) - 1;
        this.heroesResult = answer.data.results.map(
          hero => {
            const frontHero: Hero = {
              id: hero.id,
              name: hero.name,
              description: (hero.description.length > 10) ? hero.description.substring(0, 100) : hero.description
            };

            this.loading = false;
            return frontHero;
          }
        );
      },
      error => { throw new Error(error); }
    );
  }

  public navDetails(heroId) {
    this._router.navigateByUrl(`details/${heroId}`);
  }

  public setPage(page: number) {
    page = (page < 0) ? 0 :
      (page > this.lastPage) ? this.lastPage : page;

    if (page !== this.actualPage) {
      this.actualPage = page;
      this.launchSearch();
    }
  }

  public setLimit() {
    this.actualPage = 0;
    this.launchSearch();
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'detail-page',
  template: `
  <div class="page-title">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <h1 *ngIf="!hero">Details of Character</h1>
        <h1 *ngIf="hero">Details of {{hero.name}}</h1>
      </div>
    </div>
  </div>
  <div class="info-character">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="loading image" *ngIf="loadingImage">
            <h1 class="loading-banner">Loading...</h1>
          </div>
          <div class="main-image" *ngIf="!loadingImage">
            <img src="{{hero.image}}" class="img-fluid"/>
          </div>
        </div>
        <div class="col">
          <div class="loading description" *ngIf="loadingImage">
            <h1 class="loading-banner">Loading...</h1>
          </div>
          <div class="main-description" *ngIf="!loadingImage">
            <span>{{hero.description}}</span>
          </div>
          <div class="home-button">
            <button class="btn btn-primary btn-lg btn-block" (click)="goHome()" >Home</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="comics-events-stories">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="loading comics" *ngIf="loadingComics">
            <h1 class="loading-banner">Loading...</h1>
          </div>
          <div class="table-title">
            <h1>Comics:</h1>
          </div>
          <div class="container-fluid" *ngIf="comics">
            <div class="row">
              <div class="col">
                <table class="table table-hover table-bordered table-results">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let comic of comics" class="clickable">
                      <td>{{comic.title}}</td>
                      <td>{{comic.description}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row justify-content-center">
              <button type="button" class="btn btn-secondary pag" (click)="setComicPage(0)">first</button>
              <button type="button" class="btn btn-secondary pag" (click)="setComicPage (comicsPage - 1)">prev</button>
              <button type="button" class="btn btn-secondary pag" (click)="setComicPage(comicsPage + 1)">next</button>
              <button type="button" class="btn btn-secondary pag" (click)="setComicPage(comicsLastPage)">last</button>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="loading sereies" *ngIf="loadingSeries">
            <h1 class="loading-banner">Loading...</h1>
          </div>
          <div class="table-title">
            <h1>Series:</h1>
          </div>
          <div class="container-fluid" *ngIf="series">
            <div class="row">
              <div class="col">
                <table class="table table-hover table-bordered table-results">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let serie of series" class="clickable">
                      <td>{{serie.title}}</td>
                      <td>{{serie.description}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row justify-content-center">
              <button type="button" class="btn btn-secondary pag" (click)="setSeriesPage(0)">first</button>
              <button type="button" class="btn btn-secondary pag" (click)="setSeriesPage (comicsPage - 1)">prev</button>
              <button type="button" class="btn btn-secondary pag" (click)="setSeriesPage (comicsPage + 1)">next</button>
              <button type="button" class="btn btn-secondary pag" (click)="setSeriesPage (comicsLastPage)">last</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    div.comics-events-stories {
      border-top: solid 3px;
      margin: 2% 1%;
      padding-top: 1%;
    }
    .table-results { margin-top: 10px; }
    .pag { margin: 0px 5px; }
    select.form-control.pag { width: 8%; }
    div.home-button {
      margin: 1% 5% 1% 0%;
    }
    div.main-description {
      font-size: 30px;
      margin: 1% 5% 1% 0%;
      border: solid 3px;
      padding: 28px;
      border-radius: 12px;
    }
    div.main-image {
      width: 50%;
    }
    div.loading {
      display: flex;
      justify-content: center;
    }

    div.loading.image {
      align-items: center;
    }
    div.loading.description {
      align-items: center;
    }
    h1.loading-banner {
      background: rgba(0,0,0,0.5);
      padding: 1%;
      border-radius: 12px;
      position: absolute;
      z-index: 999;
      margin: 5%;
      font-size: 50px;
      -webkit-animation:colorchange 20s infinite alternate;
    }

    @-webkit-keyframes colorchange {
      0% {
        color: blue;
      }
      10% {
        color: #8e44ad;
      }
      20% {
        color: #1abc9c;
      }
      30% {
        color: #d35400;
      }
      40% {
        color: blue;
      }
      50% {
        color: #34495e;
      }
      60% {
        color: blue;
      }
      70% {
        color: #2980b9;
      }
      80% {
        color: #f1c40f;
      }
      90% {
        color: #2980b9;
      }
      100% {
        color: pink;
      }
  `]
})
export class DetailComponent {

  private _configToken: AuthToken;
  private _urlDetails: string;
  private _urlComics: string;
  private _urlSeries: string;
  private _limit = 5;

  public hero: Hero;
  public comics: MarvelElements[];
  public series: MarvelElements[];
  public loadingImage = true;
  public loadingComics = true;
  public loadingSeries = true;

  public comicsPage = 0;
  public comicsLastPage = 0;

  public seriesPage = 0;
  public seriesLastPage = 0;

  constructor(
    private _http: HttpClient,
    private _router: ActivatedRoute,
    private _navRouter: Router
  ) {

    let id: string;

    this._configToken = {
      marvelPublicKey: '<Your public key from marvel account>',
      marvelPrivateKey: '<Your private key from marvel account>'
    };

    id = this._router.snapshot.params.id;

    this._urlDetails = `/v1/public/characters/${id}`;
    this._urlComics = `${this._urlDetails}/comics`;
    this._urlSeries = `${this._urlDetails}/series`;

    this._getUrl(this._urlDetails)
    .concatMap((url: string) => this._http.get(url))
    .switchMap((result: any) => {
      this.hero = {
        id: result.data.results[0].id,
        name: result.data.results[0].name,
        description: result.data.results[0].description,
        image: `${result.data.results[0].thumbnail.path}.${result.data.results[0].thumbnail.extension}`
      };

      this.loadingImage = false;
      return Observable.of(this.hero);
    })
    .switchMap(() => this._getComics())
    .switchMap(() => this._getSeries())
    .subscribe(
      () => {},
      (err) => { throw new Error(err); }
    );

  }

  private _getUrl(url: string, limit?: number, page?: number): Observable<string> {
    let ts: string;
    let hash: string;
    let apikey: string;

    let finalUrl: string;

    const md5: Md5 = new Md5();

    ts = new Date().getTime().toString();
    apikey = this._configToken.marvelPublicKey;

    md5.appendStr(ts);
    md5.appendStr(this._configToken.marvelPrivateKey);
    md5.appendStr(this._configToken.marvelPublicKey);

    hash = md5.end().toString();

    finalUrl = `${url}?ts=${ts}&hash=${hash}&apikey=${apikey}`;

    finalUrl = finalUrl + ((limit != null) ? `&limit=${limit}` : '');
    finalUrl = finalUrl + ((page != null) ? `&offset=${page * limit}` : '');

    return Observable.of(finalUrl);
  }

  private _getComics(): Observable<MarvelElements[]> {
    this.loadingComics = true;
    return this._getUrl(this._urlComics, this._limit, this.comicsPage)
    .concatMap((url: string) => this._http.get(url))
    .do((result: any) => {
      this.comicsLastPage = Math.ceil(result.data.total / this._limit) - 1;
      this.comics = result.data.results.map((marvelComic: any) => {
        const comic: MarvelElements = {
          id: marvelComic.id,
          title: marvelComic.title,
          description: (marvelComic.description) ? `${marvelComic.description.substring(0, 50)}...` : ''
        };

        return comic;
      });

      this.loadingComics = false;
    });
  }

  private _getSeries(): Observable<MarvelElements[]> {
    this.loadingSeries = true;
    return this._getUrl(this._urlSeries, this._limit, this.seriesPage)
    .concatMap((url: string) => this._http.get(url))
    .do((result: any) => {
      this.seriesLastPage = Math.ceil(result.data.total / this._limit) - 1;
      this.series = result.data.results.map((marvelSerie: any) => {
        const serie: MarvelElements = {
          id: marvelSerie.id,
          title: marvelSerie.title,
          description: (marvelSerie.description) ? `${marvelSerie.description.substring(0, 50)}...` : ''
        };

        return serie;
      });

      this.loadingSeries = false;
    });
  }

  public goHome() {
    this._navRouter.navigateByUrl('heroes-search');
  }

  public setComicPage(page: number) {
    this.comicsPage = (page < 0) ? 0 :
    (page > this.comicsLastPage) ? this.comicsLastPage : page;

    this._getComics()
    .subscribe(
      () => {},
      err => { throw new Error (err); }
    );
  }

  public setSeriesPage (page: number) {
    this.seriesPage = (page < 0) ? 0 :
    (page > this.seriesLastPage) ? this.seriesLastPage : page;

    this._getSeries()
    .subscribe(
      () => {},
      err => { throw new Error (err); }
    );
  }
}

export const routes: Routes = [
  { path: '', redirectTo: 'heroes-search', pathMatch: 'full' },
  { path: 'heroes-search', component: HeroesSearchComponent },
  { path: 'details/:id', component: DetailComponent}
];
