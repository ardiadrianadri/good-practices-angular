import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'hero-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoadingComponent {

  @Input()
  public msg = 'Loading...'
}
