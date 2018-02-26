import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Hero } from '../common/hero';
import { MarvelAnswer } from '../common/marvel-answer';
import { TableData } from '../common/table-data';
import { TableConfiguration } from '../common/table-configuration';
import { PagEvent } from '../common/pag-event';
import { MarvelApi } from '../core/marvel-api.service';
import { TableActions } from '../common/table-actions';
import { TableTypeActions } from '../common/table-type-actions';

/**
 * Component that represent the search page of the app
 *
 * @export
 * @class HeroesSearchComponent
 * @implements {OnInit}
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'heroes-search',
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesSearchComponent implements OnInit {

  /**
   * The limit of characters in the descriptions rendered in the table
   *
   * @private
   * @static
   * @memberof HeroesSearchComponent
   */
  private static _descriptionLimit = 100;

  /**
   * Endpoint to request the list of characters
   *
   * @private
   * @type {string}
   * @memberof HeroesSearchComponent
   */
  private _url: string;

  /**
   * Hero name used to request the list of characters
   *
   * @type {string}
   * @memberof HeroesSearchComponent
   */
  public heroName: string;

  /**
   * Flag to show or hide the loading component
   *
   * @memberof HeroesSearchComponent
   */
  public loading = false;

  /**
   * Observable with the table data to render the list of Marvel characters
   *
   * @type {BehaviorSubject<TableData>}
   * @memberof HeroesSearchComponent
   */
  public tableHeros$: BehaviorSubject<TableData>;
  public tableConfig: TableConfiguration;

  /**
   * Creates an instance of HeroesSearchComponent.
   * @param {MarvelApi} _marvelService - Service to request data to the Marvel API
   * @param {Router} _router - The router
   * @memberof HeroesSearchComponent
   */
  constructor(
    private _marvelService: MarvelApi,
    private _router: Router
  ) {}

  /**
   * The method is executed in the onInit event in the life cycle of the component. Initialize the search view
   *
   * @memberof HeroesSearchComponent
   */
  ngOnInit() {
    this.tableConfig = {
      columns: [
        { title: 'Name', field: 'name' },
        { title: 'Description', field: 'description' }
      ],
      pageSize: [ 5, 10, 15],
      initialSize: 10
    };

    this.tableHeros$ = new BehaviorSubject(null);
  }


  /**
   * Method to handle the events from the table
   *
   * @param {TableActions} action - Information about the action done in the table
   * @memberof HeroesSearchComponent
   */
  public doAction (action: TableActions) {
    switch (action.type) {
      case TableTypeActions.CLICK:
        this._navDetails(action.payload);
        break;
      case TableTypeActions.REQUEST_DATA:
        this.launchSearch(action.payload);
        break;
    }
  }

  /**
   * Public method to search the Marvel API for a list of characters whose names match the name entered in the form
   *
   * @param {PagEvent} pagEvent - Object with the information
   * @memberof HeroesSearchComponent
   */
  public launchSearch( pagEvent: PagEvent) {
    const eventPag: PagEvent = (pagEvent) ? pagEvent : { page: 0, limit: 10 }

    this.loading = true;

    this._marvelService.getListHeroes(this.heroName, eventPag.limit, (eventPag.limit * eventPag.page))
    .subscribe(
      (data: MarvelAnswer) => {
        const lastPage = Math.ceil(data.total / eventPag.limit) - 1;
        const heroesResult = (data.result as Hero[]).map((hero: Hero) => {
          hero.description = (hero.description) ? hero.description.substring(0, HeroesSearchComponent._descriptionLimit) : '';
          return hero;
        });

        const tableHeros = {
          data: heroesResult,
          lastPage: lastPage
        };
        this.loading = false;
        this.tableHeros$.next(tableHeros);
      },
      (err: any) => { throw new Error(err); }
    );
  }

  /**
   * Private method to navigate on the details page
   *
   * @private
   * @param {any} heroId
   * @memberof HeroesSearchComponent
   */
  private _navDetails(heroId) {
    this._router.navigateByUrl(`details/${heroId}`);
  }
}
