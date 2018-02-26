import { BaseElement } from './base-element';

/**
 * Defines an Hero object
 *
 * @export
 * @interface Hero
 * @extends {BaseElement}
 */
export interface Hero extends BaseElement {
  /**
   * Name of the hero
   *
   * @type {string}
   * @memberof Hero
   */
  name: string;
  /**
   * Small bio of the hero
   *
   * @type {string}
   * @memberof Hero
   */
  description: string;
  /**
   * Path to an image of the hero
   *
   * @type {string}
   * @memberof Hero
   */
  image: string;
}
