import { TableTypeActions } from './table-type-actions';

/**
 * Definition of the action event for the table
 *
 * @export
 * @interface TableActions
 */
export interface TableActions {
  /**
   * Type of the action
   *
   * @type {TableTypeActions}
   * @memberof TableActions
   */
  type: TableTypeActions;
  /**
   * Additional data needed to perform the action
   *
   * @type {*}
   * @memberof TableActions
   */
  payload: any;
}
