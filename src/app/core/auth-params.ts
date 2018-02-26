/**
 * Definition of the object to store the authentication tokens
 *
 * @export
 * @interface AuthParams
 */
export interface AuthParams {
  /**
   * Time stamp
   *
   * @type {string}
   * @memberof AuthParams
   */
  ts: string;
  /**
   * Token created from the time stamp, the private key and the public key
   *
   * @type {string}
   * @memberof AuthParams
   */
  hash: string;
  /**
   * App public key
   *
   * @type {string}
   * @memberof AuthParams
   */
  apikey: string;
}
