import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../common/hero';
import { MarvelAnswer } from '../common/marvel-answer';
import { MarvelApi } from '../core/marvel-api.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'heroes-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class HeroesSearchComponent {

  private _url: string;

  public heroName: string;
  public limit = 10;
  public heroesResult: Hero[];
  public lastPage = 0;
  public actualPage = 0;
  public loading = false;


  constructor(
    private _marvelService: MarvelApi,
    private _router: Router
  ) {}

  public launchSearch() {
    this.loading = true;

    this._marvelService.getListHeroes(this.heroName, this.limit, (this.limit * this.actualPage))
    .subscribe(
      (data: MarvelAnswer) => {
        this.lastPage = Math.ceil(data.total / this.limit) - 1;
        this.heroesResult = (data.result as Hero[]).map((hero: Hero) => {
          hero.description = (hero.description) ? hero.description.substring(0,100) : '';
          return hero;
        });
        this.loading = false;
      },
      (err: any) => { throw new Error(err); }
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
