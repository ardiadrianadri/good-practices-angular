import { BaseElement } from './base-element';

/**
 * Definition of data object for the table
 *
 * @export
 * @interface TableData
 */
export interface TableData {
  /**
   * Index to the last page of the table
   *
   * @type {number}
   * @memberof TableData
   */
  lastPage: number;
  /**
   * Array with the rows of the table
   *
   * @type {BaseElement []}
   * @memberof TableData
   */
  data: BaseElement [];
}
