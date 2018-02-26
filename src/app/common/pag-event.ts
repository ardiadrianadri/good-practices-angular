/**
 * Definition of a page for the table
 *
 * @export
 * @interface PagEvent
 */
export interface PagEvent {
  /**
   * Number of the page in the table
   *
   * @type {number}
   * @memberof PagEvent
   */
  page: number;
  /**
   * Maximum number of rows that the page can have
   *
   * @type {number}
   * @memberof PagEvent
   */
  limit: number;
}
