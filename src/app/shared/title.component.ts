import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'hero-title',
  templateUrl: './title.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TitleComponent {

  @Input()
  public title: string = '';
}
