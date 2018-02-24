import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';


import { TableData } from '../common/table-data';
import { TableConfiguration } from '../common/table-configuration';
import { PagEvent } from '../common/pag-event';
import { TableActions } from '../common/table-actions';
import { TableTypeActions } from '../common/table-type-actions';

@Component({
  selector: 'hero-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {

  @Input()
  public tableData: TableData;

  @Input()
  public tableConfig: TableConfiguration;

  @Output()
  public emitAction: EventEmitter<TableActions> = new EventEmitter<TableActions>();

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

    this.emitAction.emit({
      type: TableTypeActions.REQUEST_DATA,
      payload: pagEvent
    });

    this.actualPage = finalPage;
  }

  public onRowClick(id: string) {
    this.emitAction.emit({
      type: TableTypeActions.CLICK,
      payload: id
    });
  }
}
