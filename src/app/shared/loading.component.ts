import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'hero-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoadingComponent {

  @Input()
  public msg = 'Loading...';
}
