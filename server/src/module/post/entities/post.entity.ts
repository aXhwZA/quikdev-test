import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Type } from 'class-transformer';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';
// import Comment from 'src/models/comment.model';
// import User from 'src/models/user.model';

export type PostDocument = Post & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class Post {
  @Prop({
    type: String,
    unique: true,
    default: function genUUID() {
      return uuid();
    },
  })
  postId: string;

  @Prop({ required: true, maxLength: 100 })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Type(() => User)
  User: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] }) // Change this line
  commentId: string[];

  @Type(() => Comment)
  Comment: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: 'commentId',
  foreignField: '_id',
  justOne: false,
});
