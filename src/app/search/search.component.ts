import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Md5 } from 'ts-md5/dist/md5';

import { AuthToken } from '../common/auth-token';
import { Hero } from '../common/hero';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'heroes-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
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
