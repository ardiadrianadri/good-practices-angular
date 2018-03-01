import { BaseElement } from './base-element';

/**
 * All Marvel elements which do not fit in a hero definition
 *
 * @export
 * @interface MarvelElements
 * @extends {BaseElement}
 */
export interface MarvelElements extends BaseElement {
  /**
   * Title of the element
   *
   * @type {string}
   * @memberof MarvelElements
   */
  title: string;
  /**
   * Short description of the element
   *
   * @type {string}
   * @memberof MarvelElements
   */
  description: string;
}
