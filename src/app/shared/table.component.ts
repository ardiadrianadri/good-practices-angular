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

/**
 * Component which represents the tables in the app
 *
 * @export
 * @class TableComponent
 * @implements {OnInit}
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'hero-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {

  /**
   * Object with the information of the table rows
   *
   * @type {TableData}
   * @memberof TableComponent
   */
  @Input()
  public tableData: TableData;

  /**
   * Object with the configuration of the table
   *
   * @type {TableConfiguration}
   * @memberof TableComponent
   */
  @Input()
  public tableConfig: TableConfiguration;

  /**
   * Output event for the table actions
   *
   * @type {EventEmitter<TableActions>}
   * @memberof TableComponent
   */
  @Output()
  public emitAction: EventEmitter<TableActions> = new EventEmitter<TableActions>();

  /**
   * Maximum number of rows per page
   *
   * @memberof TableComponent
   */
  public limit = 0;

  /**
   * Actual table page
   *
   * @memberof TableComponent
   */
  public actualPage = 0;

  /**
   * Method executed on the event onInit of the Component life cycle. It is used to initialise the component
   *
   * @memberof TableComponent
   */
  ngOnInit() {
    this.limit = this.tableConfig.initialSize;
  }

  /**
   * Method executed each time the user want to change the table page
   *
   * @param {number} page - Number of the page to render
   * @memberof TableComponent
   */
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

  /**
   * Method executed each time the user click on a row
   *
   * @param {string} id
   * @memberof TableComponent
   */
  public onRowClick(id: string) {
    this.emitAction.emit({
      type: TableTypeActions.CLICK,
      payload: id
    });
  }
}
