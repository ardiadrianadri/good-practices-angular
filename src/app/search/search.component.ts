import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../common/hero';
import { MarvelAnswer } from '../common/marvel-answer';
import { TableData } from '../common/table-data';
import { TableConfiguration } from '../common/table-configuration';
import { PagEvent } from '../common/pag-event';
import { MarvelApi } from '../core/marvel-api.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'heroes-search',
  templateUrl: './search.component.html'
})
export class HeroesSearchComponent implements OnInit {

  private static _descriptionLimit = 100;
  private _url: string;

  public heroName: string;
  public loading = false;
  public tableHeros: TableData;
  public tableConfig: TableConfiguration;


  constructor(
    private _marvelService: MarvelApi,
    private _router: Router
  ) {}

  ngOnInit() {
    this.tableConfig = {
      columns: [
        { title: 'Name', field: 'name' },
        { title: 'Description', field: 'description' }
      ],
      pageSize: [ 5, 10, 15],
      initialSize: 10
    };
  }

  public launchSearch( pagEvent: PagEvent) {
    const eventPag: PagEvent = (pagEvent) ? pagEvent : { page: 0, limit: 10 };

    this.loading = true;

    this._marvelService.getListHeroes(this.heroName, eventPag.limit, (eventPag.limit * eventPag.page))
    .subscribe(
      (data: MarvelAnswer) => {
        const lastPage = Math.ceil(data.total / eventPag.limit) - 1;
        const heroesResult = (data.result as Hero[]).map((hero: Hero) => {
          hero.description = (hero.description) ? hero.description.substring(0, HeroesSearchComponent._descriptionLimit) : '';
          return hero;
        });

        this.tableHeros = {
          data: heroesResult,
          lastPage: lastPage
        };

        this.loading = false;
      },
      (err: any) => { throw new Error(err); }
    );
  }

  public navDetails(heroId) {
    this._router.navigateByUrl(`details/${heroId}`);
  }
}
