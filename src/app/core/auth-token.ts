/**
 * Definition of the configuration file for the authentication service
 *
 * @export
 * @interface AuthToken
 */
export interface AuthToken {
  /**
   * App public key
   *
   * @type {string}
   * @memberof AuthToken
   */
  marvelPublicKey: string;
  /**
   * App private key
   *
   * @type {string}
   * @memberof AuthToken
   */
  marvelPrivateKey: string;
}

