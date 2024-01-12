import { User, UserSchema } from '../module/user/entities/user.entity';
import { Post, PostSchema } from '../module/post/entities/post.entity';
import {
  Comment,
  CommentSchema,
} from '../module/comment/entities/comment.entity';

export default [
  { name: User.name, schema: UserSchema },
  { name: Post.name, schema: PostSchema },
  { name: Comment.name, schema: CommentSchema },
];
