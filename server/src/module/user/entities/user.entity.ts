import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { Type } from 'class-transformer';
import { Post } from '../../post/entities/post.entity';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
    unique: true,
    default: function genUUID() {
      return uuid();
    },
  })
  userId: string;

  @Prop({ required: true, maxlength: 100 })
  name: string;

  @Prop({ required: true, unique: true, maxlength: 191 })
  email: string;

  @Prop({ required: true })
  password: string;

  @Type(() => Post)
  Post: Post;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.virtual('post', {
  ref: Post,
  localField: 'postId',
  foreignField: 'postId',
  justOne: false,
});
