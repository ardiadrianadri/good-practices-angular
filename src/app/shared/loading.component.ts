import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'hero-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {

  @Input()
  public msg = 'Loading...'
}
