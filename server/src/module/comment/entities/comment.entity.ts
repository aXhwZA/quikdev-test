import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Type } from 'class-transformer';
import { Post } from '../../post/entities/post.entity';

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

  @Prop({ required: true, maxLength: 100 })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  postId: string;

  @Type(() => Post)
  Post: Post;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.virtual('post', {
  ref: 'Post',
  localField: 'postId',
  foreignField: '_id',
});
