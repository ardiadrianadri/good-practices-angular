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

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'detail-page',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent implements OnInit {

  private static _descriptionLimit = 50;
  private static _limit = 5;
  private _id: string;

  public title = 'Details of Character';
  public hero: Hero;
  public comics$: BehaviorSubject<TableData> = new BehaviorSubject<TableData>(null);
  public series$: BehaviorSubject<TableData> = new BehaviorSubject<TableData>(null);
  public tableConfig: TableConfiguration;
  public loadingImage = true;
  public loadingComics = true;
  public loadingSeries = true;

  public comicsLastPage = 0;

  public seriesLastPage = 0;

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

  public doActionComics (action: TableActions) {
    switch (action.type) {
      case TableTypeActions.REQUEST_DATA:
        this._getComics(action.payload);
        break;
    }
  }

  public doActionSeries (action: TableActions) {
    switch (action.type) {
      case TableTypeActions.REQUEST_DATA:
        this._getSeries(action.payload);
        break;
    }
  }

  private _shortDescription (elements: TableData): TableData {
    elements.data = elements.data.map((element: BaseElement ) => {
      const marvelElement = (element as MarvelElements);
      marvelElement.description = (marvelElement.description) ?
      marvelElement.description.substring(0, DetailComponent._descriptionLimit) : '';
      return marvelElement;
    });

    return elements;
  }

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

  public goHome() {
    this._navRouter.navigateByUrl('heroes-search');
  }
}
