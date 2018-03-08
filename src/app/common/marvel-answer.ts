import { Hero } from './hero';
import { MarvelElements } from './marvel-elements';

/**
 * Defines the answer obtained from the Marvel API
 *
 * @export
 * @interface MarvelAnswer
 */
export interface MarvelAnswer {
  /**
   * Number of elements skipped in the answer
   *
   * @type {number}
   * @memberof MarvelAnswer
   */
  offset: number;
  /**
   * Maximum number of elements which can be obtained in the answer
   *
   * @type {number}
   * @memberof MarvelAnswer
   */
  limit: number;
  /**
   * Total number of elements which fit with the request
   *
   * @type {number}
   * @memberof MarvelAnswer
   */
  total: number;
  /**
   * Total number of elements obtained
   *
   * @type {number}
   * @memberof MarvelAnswer
   */
  count: number;
  /**
   * Array with the elements obtained in the answer
   *
   * @type {(Hero[] | MarvelElements[])}
   * @memberof MarvelAnswer
   */
  result: Hero[] | MarvelElements[];
}
