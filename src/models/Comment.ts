import mongoose, { Document, PopulatedDoc, Schema } from 'mongoose';

import TextService from '../services/TextService';
import { Model } from '../utils/constants';
import { BaseModel, ID } from '../utils/types';
import Post, { PostDocument } from './Post';
import User, { UserDocument } from './User';

interface IComment extends BaseModel {
  /**
   * User that is associated with the creation of the comment.
   */
  author: PopulatedDoc<UserDocument>;

  /**
   * Text content of the comment.
   */
  content: string;

  /**
   * Post that the comment was created on.
   */
  post: PopulatedDoc<PostDocument>;
}

export type CommentDocument = Document<{}, {}, IComment> & IComment;

const commentSchema: Schema<CommentDocument> = new Schema<CommentDocument>(
  {
    // author property of the schema references the User model
    author: { ref: Model.USER, required: true, type: ID },
    // content property
    content: { required: true, type: String },
    // post property itself
    post: { ref: Model.POST, required: true, type: ID }
  },
  { timestamps: true }
);

commentSchema.pre('save', function () {
  if (this.isNew) {
    /**
     * TODO: (6.05)
     * - Send a text to the author of the post notifying them that a podmate
     * commented under it!
     */
  }
});

const Comment: mongoose.Model<CommentDocument> =
  mongoose.model<CommentDocument>(Model.COMMENT, commentSchema);

export default Comment;
