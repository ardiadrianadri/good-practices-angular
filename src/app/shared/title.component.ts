import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

/**
 * Component to represent the title of a web page
 *
 * @export
 * @class TitleComponent
 */
@Component({
  selector: 'hero-title',
  templateUrl: './title.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleComponent {

  /**
   * Message displayed in the title
   *
   * @type {string}
   * @memberof TitleComponent
   */
  @Input()
  public title: string = '';
}
