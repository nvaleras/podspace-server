import User, { UserDocument } from '../models/User';
import BaseRoute from '../utils/BaseRoute';
import { RouteMethod } from '../utils/constants';

export default class ListMembersRoute extends BaseRoute<UserDocument[]> {
  constructor() {
    super({
      authenticated: true,
      method: RouteMethod.GET,
      path: '/users'
    });
  }

  /**
   * Returns a list of all the users in the database, sorted in
   * ascending order by their creation date.
   */
  async content(): Promise<UserDocument[]> {
    const users: UserDocument[] = await User.find().sort({ createdAt: 1 });
    return users;
  }
}
