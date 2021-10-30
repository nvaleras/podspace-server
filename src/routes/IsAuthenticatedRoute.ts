import { ApplicationRequest } from '../utils/ApplicationRequest';
import AuthUtils from '../utils/AuthUtils';
import BaseRoute from '../utils/BaseRoute';
import { RouteMethod } from '../utils/constants';

export default class IsAuthenticatedRoute extends BaseRoute<boolean> {
  constructor() {
    super({
      /**
       * TODO: (10.04)
       * - Replace null with the correct route type from the RouteMethod enum
       * in the constants.ts file.
       * - Fill in the path string with the appropriate path to this endpoint.
       * - Delete this comment.
       */
      method: RouteMethod.POST,
      path: '/method'
    });
  }

  /**
   * Returns true if the user making the request is authenticated, and false
   * otherwise.
   *
   * A request will be deemed "authenticated" if either the access token is
   * verified OR the refresh token is verified.
   *
   * Should use AuthUtils.verfifyToken()!
   */
  async content(req: ApplicationRequest): Promise<boolean> {
    // TODO: (10.05) Get the accessToken and refreshToken from the request
    // using req.cookies.

    // TODO: (10.06) If either the accessToken or the refreshToken are verified,
    // return true!
    return false;
  }
}
