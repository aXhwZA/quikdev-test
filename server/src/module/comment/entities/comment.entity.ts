import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Type } from 'class-transformer';
import { Post } from '../../post/entities/post.entity';
import { User } from '../../user/entities/user.entity';

export type CommentDocument = Comment & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class Comment {
  @Prop({
    type: String,
    unique: true,
    default: function genUUID() {
      return uuid();
    },
  })
  commentId: string;

  @Prop({ required: false })
  replyUserId: string;

  @Prop({ required: false, maxLength: 100 })
  description: string;

  @Prop({ required: false })
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  postId: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  repliesId: string[];

  @Type(() => Post)
  Post: Post;

  @Type(() => Comment)
  Replies: Comment[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Type(() => User)
  User: User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.virtual('post', {
  ref: 'Post',
  localField: 'postId',
  foreignField: '_id',
  justOne: true,
});

CommentSchema.virtual('replies', {
  ref: 'Comment',
  localField: 'repliesId',
  foreignField: '_id',
  justOne: false,
});

CommentSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});
