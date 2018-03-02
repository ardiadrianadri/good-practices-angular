import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Hero } from '../common/hero';
import { MarvelElements } from '../common/marvel-elements';
import { MarvelAnswer } from '../common/marvel-answer';
import { MarvelApi } from '../core/marvel-api.service';
import { TableData } from '../common/table-data';
import { TableConfiguration } from '../common/table-configuration';
import { PagEvent } from '../common/pag-event';
import { BaseElement } from '../common/base-element';
import { TableActions } from '../common/table-actions';
import { TableTypeActions } from '../common/table-type-actions';

/**
 * Component used to render the details view
 *
 * @export
 * @class DetailComponent
 * @implements {OnInit}
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'detail-page',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent implements OnInit {

  /**
   * Limit of characters used in the description of the comics and series
   *
   * @private
   * @static
   * @memberof DetailComponent
   */
  private static _descriptionLimit = 50;

  /**
   * Maximum number of result rendered in the tables
   *
   * @private
   * @static
   * @memberof DetailComponent
   */
  private static _limit = 5;

  /**
   * Id of Marvel character which details are rendered in the view
   *
   * @private
   * @type {string}
   * @memberof DetailComponent
   */
  private _id: string;

  /**
   * Default title of the view
   *
   * @memberof DetailComponent
   */
  public title = 'Details of Character';

  /**
   * Object with the details of the Marvel character
   *
   * @type {Hero}
   * @memberof DetailComponent
   */
  public hero: Hero;

  /**
   * Observable with the list of comics of the character
   *
   * @type {BehaviorSubject<TableData>}
   * @memberof DetailComponent
   */
  public comics$: BehaviorSubject<TableData> = new BehaviorSubject<TableData>(null);

  /**
   * Observable with the list of series of the character
   *
   * @type {BehaviorSubject<TableData>}
   * @memberof DetailComponent
   */
  public series$: BehaviorSubject<TableData> = new BehaviorSubject<TableData>(null);

  /**
   * Configuration of the two tables
   *
   * @type {TableConfiguration}
   * @memberof DetailComponent
   */
  public tableConfig: TableConfiguration;

  /**
   * Flag to show or hide the loading component for the hero details
   *
   * @memberof DetailComponent
   */
  public loadingImage = true;

  /**
   * Flag to show or hide the loading component for the comics table
   *
   * @memberof DetailComponent
   */
  public loadingComics = true;

  /**
   * Flag to show or hide the loading component for the series table
   *
   * @memberof DetailComponent
   */
  public loadingSeries = true;

  /**
   * Last page of the commics table
   *
   * @memberof DetailComponent
   */
  public comicsLastPage = 0;

  /**
   * Last page of the series table
   *
   * @memberof DetailComponent
   */
  public seriesLastPage = 0;

  /**
   * Creates an instance of DetailComponent.
   * @param {MarvelApi} _marvelService - Service to get the data from the Marvel API
   * @param {ActivatedRoute} _router - Activated route of the details view
   * @param {Router} _navRouter - The router
   * @memberof DetailComponent
   */
  constructor(
    private _marvelService: MarvelApi,
    private _router: ActivatedRoute,
    private _navRouter: Router
  ) {

    this._id = this._router.snapshot.params.id;

    this._marvelService.getDetailsHero(this._id)
    .subscribe((answer: MarvelAnswer) => {
      this.hero = (answer.result[0] as Hero);
      this.title = `Details of ${this.hero.name}`;
      this.loadingImage = false;
    });
  }

  /**
   * Event onInit of the life cicle of the component. It is used to initialized the view
   *
   * @memberof DetailComponent
   */
  ngOnInit() {
    this.tableConfig = {
      columns: [
        {title: 'Title', field: 'title'},
        {title: 'Description', field: 'description'}
      ]
    };

    this._getComics();
    this._getSeries();
  }

  /**
   * Method used to catch the events on the comics table
   *
   * @param {TableActions} action
   * @memberof DetailComponent
   */
  public doActionComics (action: TableActions) {
    switch(action.type) {
      case TableTypeActions.REQUEST_DATA:
        this._getComics(action.payload);
        break;
    }
  }

  /**
   * Method used to catch the events on the series table
   *
   * @param {TableActions} action
   * @memberof DetailComponent
   */
  public doActionSeries (action: TableActions) {
    switch(action.type) {
      case TableTypeActions.REQUEST_DATA:
        this._getSeries(action.payload);
        break;
    }
  }

  /**
   * Method to navigate at the home web site
   *
   * @memberof DetailComponent
   */
  public goHome() {
    this._navRouter.navigateByUrl('heroes-search');
  }

  /**
   * Private method used to shorten the description in the series and comics tables
   *
   * @private
   * @param {TableData} elements
   * @returns {TableData}
   * @memberof DetailComponent
   */
  private _shortDescription (elements: TableData): TableData {
    elements.data = elements.data.map((element: BaseElement)=> {
      const marvelElement = (element as MarvelElements);
      marvelElement.description = (marvelElement.description) ? marvelElement.description.substring(0, DetailComponent._descriptionLimit): '';
      return marvelElement;
    })

    return elements;
  }

  /**
   * Private method to request data about the comics of the Marvel character
   *
   * @private
   * @param {PagEvent} [pagEvent] - Object with the pagination data
   * @memberof DetailComponent
   */
  private _getComics(pagEvent?: PagEvent): void {
    const eventPag: PagEvent = (pagEvent) ? pagEvent : { page: 0, limit: DetailComponent._limit };
    this.loadingComics = true;
    this._marvelService.getListComics(this._id, DetailComponent._limit, (DetailComponent._limit * eventPag.page))
    .subscribe ((answer: MarvelAnswer) => {
      const comicsLastPage = Math.ceil(answer.total / DetailComponent._limit) - 1;
      let tableData: TableData = {
        data: answer.result,
        lastPage: comicsLastPage
      };

      tableData = this._shortDescription(tableData);
      this.loadingComics = false;
      this.comics$.next(tableData);
    });
  }

  /**
   * Private method to request information about the series of the Marvel character
   *
   * @private
   * @param {PagEvent} [pagEvent] - Object with the pagination data
   * @memberof DetailComponent
   */
  private _getSeries(pagEvent?: PagEvent): void {
    const eventPag: PagEvent = (pagEvent) ? pagEvent : { page: 0, limit: DetailComponent._limit };
    this.loadingSeries = true;
    this._marvelService.getListSeries(this._id, DetailComponent._limit, (DetailComponent._limit * eventPag.page))
    .subscribe((answer: MarvelAnswer) => {
      const seriesLastPage = Math.ceil(answer.total / DetailComponent._limit) - 1;
      let tableData: TableData = {
        data: answer.result,
        lastPage: seriesLastPage
      };

      tableData = this._shortDescription(tableData);
      this.loadingSeries = false;
      this.series$.next(tableData);
    },
    (err: any) => { throw new Error(err); }
  );
  }

}
