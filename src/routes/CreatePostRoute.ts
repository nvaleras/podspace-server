import { body } from 'express-validator';

import Post, { PostDocument, PostType } from '../models/Post';
import { ApplicationRequest } from '../utils/ApplicationRequest';
import BaseRoute from '../utils/BaseRoute';
import { RouteMethod } from '../utils/constants';
import { IdArgs } from '../utils/types';

type CreatePostBody = Pick<PostDocument, 'content' | 'type'>;
type CreatePostRequest = ApplicationRequest<IdArgs, CreatePostBody>;

export default class CreatePostRoute extends BaseRoute<PostDocument> {
  constructor() {
    super({
      authenticated: true,
      method: RouteMethod.POST,
      path: '/posts'
    });
  }

  /**
   * Validate the following inputs:
   *  - body.content
   *  - body.type
   */
  middleware() {
    return [
      body('content')
        .isLength({ min: 1 })
        .withMessage('Your post cannot be empty.'),

      body('type')
        .if((value: PostType) => !!value)
        .isIn(Object.values(PostType))
        .withMessage('You must choose a valid PostType.')
    ];
  }

  /**
   * Creates a new post with the logged-in user as the author.
   *
   * @returns The newly created post.
   */
  async content(req: CreatePostRequest): Promise<PostDocument> {
    const { content, type } = req.body;

    const post: PostDocument = await Post.create({
      author: req.user?._id,
      content,
      type
    });

    return post;
  }
}
