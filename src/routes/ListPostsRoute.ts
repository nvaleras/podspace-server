import Post, { PostDocument } from '../models/Post';
import { ApplicationRequest } from '../utils/ApplicationRequest';
import BaseRoute from '../utils/BaseRoute';
import { Model, RouteMethod } from '../utils/constants';
import { PaginationOptions } from '../utils/types';

type ListPostsRequest = ApplicationRequest<{}, {}, PaginationOptions>;

export default class ListPostsRoute extends BaseRoute<PostDocument[]> {
  constructor() {
    super({
      authenticated: true,
      method: RouteMethod.POST,
      path: '/posts'
    });
  }

  /**
   * Returns a list of all the posts, with the following populations:
   *  - author
   *  - comments
   *  - reactions
   *
   * These posts should be sorted in descending order by their creation date
   * (newer posts show up first).
   *
   * This query should also support pagination, so you will have to use the
   * .limit() and .skip() methods to fetch the appropriate documents.
   */
  async content(req: ListPostsRequest): Promise<PostDocument[]> {
    const { page, limit } = req.query;
    const limitAsNumber = Number(limit);
    const pageAsNumber = Number(page);

    const posts: PostDocument[] = await Post.find()
      .limit(limitAsNumber)
      .skip(limitAsNumber * pageAsNumber)
      .sort({ createdAt: -1 });

    return posts;
  }
}
