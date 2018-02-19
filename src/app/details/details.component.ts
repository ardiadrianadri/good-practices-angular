import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';


import { Hero } from '../common/hero';
import { MarvelElements } from '../common/marvel-elements';
import { MarvelAnswer } from '../common/marvel-answer';
import { MarvelApi } from '../core/marvel-api.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'detail-page',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailComponent {

  private _limit = 5;
  private _id: string;

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
    private _marvelService: MarvelApi,
    private _router: ActivatedRoute,
    private _navRouter: Router
  ) {

    this._id = this._router.snapshot.params.id;

    this._marvelService.getDetailsHero(this._id)
    .switchMap((answer: MarvelAnswer) => {
      this.hero = (answer.result[0] as Hero);
      this.loadingImage = false;
      return this._getComics();
    })
    .switchMap((comics: MarvelElements[]) => {
      this.comics = this._shortDescription(comics);
      return this._getSeries()
    })
    .subscribe(
      (series: MarvelElements[]) => {
        this.series = this._shortDescription(series);
      },
      (err) => { throw new Error(err); }
    );
  }

  private _getComics(): Observable<MarvelElements[]> {
    this.loadingComics = true;
    return this._marvelService.getListComics(this._id, this._limit, (this._limit * this.comicsPage))
    .map((answer: MarvelAnswer) => {
      this.comicsLastPage = Math.ceil(answer.total / this._limit) - 1;
      this.loadingComics = false;
      return (answer.result as MarvelElements[]);
    });
  }

  private _shortDescription (elements: MarvelElements[]): MarvelElements[] {
    return elements.map((element: MarvelElements) => {
      element.description = (element.description) ? element.description.substring(0,50) : '';
      return element;
    });
  }

  private _getSeries(): Observable<MarvelElements[]> {
    this.loadingSeries = true;
    return this._marvelService.getListSeries(this._id, this._limit, (this._limit * this.seriesPage))
    .map((answer: MarvelAnswer) => {
      this.seriesLastPage = Math.ceil(answer.total / this._limit) - 1;
      this.loadingSeries = false;
      return (answer.result as MarvelElements[]);
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
      (comics: MarvelElements[]) => { this.comics = this._shortDescription(comics); },
      err => { throw new Error (err); }
    );
  }

  public setSeriesPage (page: number) {
    this.seriesPage = (page < 0) ? 0 :
    (page > this.seriesLastPage) ? this.seriesLastPage : page;

    this._getSeries()
    .subscribe(
      (series: MarvelElements[]) => { this.series = this._shortDescription(series); },
      err => { throw new Error (err); }
    );
  }
}
