import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

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
  private static _descriptionLimit = 50;
  private static _limit = 5;
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

    this._marvelService.getDetailsHero(this._id).subscribe(
      (answer: MarvelAnswer) => {
        this.hero = answer.result[0] as Hero;
        this.loadingImage = false;
        return this._getComics();
      },
      (error: any) => {
        throw new Error(error);
      }
    );

    this._getComics();
    this._getSeries();
  }

  private _getComics() {
    this.loadingComics = true;
    this._marvelService
      .getListComics(
        this._id,
        DetailComponent._limit,
        DetailComponent._limit * this.comicsPage
      )
      .subscribe(
        (answer: MarvelAnswer) => {
          this.comicsLastPage =
            Math.ceil(answer.total / DetailComponent._limit) - 1;
          this.loadingComics = false;
          this.comics = this._shortDescription(
            answer.result as MarvelElements[]
          );
        },
        (error: any) => {
          throw new Error(error);
        }
      );
  }

  private _shortDescription(elements: MarvelElements[]): MarvelElements[] {
    return elements.map((element: MarvelElements) => {
      element.description = element.description
        ? element.description.substring(0, DetailComponent._descriptionLimit)
        : '';
      return element;
    });
  }

  private _getSeries() {
    this.loadingSeries = true;
    this._marvelService
      .getListSeries(
        this._id,
        DetailComponent._limit,
        DetailComponent._limit * this.seriesPage
      )
      .subscribe(
        (answer: MarvelAnswer) => {
          this.seriesLastPage =
            Math.ceil(answer.total / DetailComponent._limit) - 1;
          this.loadingSeries = false;
          this.series = this._shortDescription(
            answer.result as MarvelElements[]
          );
        },
        (error: any) => {
          throw new Error(error);
        }
      );
  }

  public goHome() {
    this._navRouter.navigateByUrl('heroes-search');
  }

  public setComicPage(page: number) {
    this.comicsPage =
      page < 0 ? 0 : page > this.comicsLastPage ? this.comicsLastPage : page;

    this._getComics();
  }

  public setSeriesPage(page: number) {
    this.seriesPage =
      page < 0 ? 0 : page > this.seriesLastPage ? this.seriesLastPage : page;

    this._getSeries();
  }
}
