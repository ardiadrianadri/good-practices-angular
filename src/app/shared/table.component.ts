import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { TableData } from '../common/table-data';
import { TableConfiguration } from '../common/table-configuration';
import { PagEvent } from '../common/pag-event';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'hero-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {

  @Input()
  public tableData: TableData;

  @Input()
  public tableConfig: TableConfiguration;

  @Output()
  public rowClick: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public requestNewData: EventEmitter<PagEvent> = new EventEmitter<PagEvent>();

  public limit = 0;
  public actualPage = 0;

  ngOnInit() {
    this.limit = this.tableConfig.initialSize;
  }

  public onChangePage (page: number) {
    const finalPage = (page < 0) ? 0 : (page > this.tableData.lastPage) ? this.tableData.lastPage : page;
    const pagEvent: PagEvent = {
      page: finalPage,
      limit: this.limit
    };

    this.requestNewData.emit(pagEvent);
    this.actualPage = finalPage;
  }

  public onRowClick(id: string) {
    this.rowClick.emit(id);
  }
}
