import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

/**
 * Component to display the loading message when the app is waiting for new data
 *
 * @export
 * @class LoadingComponent
 */
@Component({
  selector: 'hero-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {

  /**
   * Message displayed in the loadding component
   *
   * @memberof LoadingComponent
   */
  @Input()
  public msg = 'Loading...'
}
