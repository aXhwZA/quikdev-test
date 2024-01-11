import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Type } from 'class-transformer';
import { User } from '../../user/entities/user.entity';

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
  userId?: string;

  @Type(() => User)
  User: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.virtual('user', {
  ref: User,
  localField: 'userId',
  foreignField: 'userId',
  justOne: true,
});
