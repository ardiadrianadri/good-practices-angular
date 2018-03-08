/**
 * Definition of a table column
 *
 * @interface Column
 */
interface Column {
  /**
   * Header of the table
   *
   * @type {string}
   * @memberof Column
   */
  title: string;
  /**
   * Attribute which should be rendered in the column
   *
   * @type {string}
   * @memberof Column
   */
  field: string;
}

/**
 * Define the configuration object for the table
 *
 * @export
 * @interface TableConfiguration
 */
export interface TableConfiguration {
  /**
   * Array with the table columns
   *
   * @type {Column[]}
   * @memberof TableConfiguration
   */
  columns: Column[];
  /**
   * Array with the differents size of the table pages
   *
   * @type {number[]}
   * @memberof TableConfiguration
   */
  pageSize?: number[];
  /**
   * Value of the default size of the table page
   *
   * @type {number}
   * @memberof TableConfiguration
   */
  initialSize?: number;
}
