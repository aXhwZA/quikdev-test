import { User, UserSchema } from '../module/user/entities/user.entity';
import { Post, PostSchema } from '../module/post/entities/post.entity';

export default [
  { name: User.name, schema: UserSchema },
  { name: Post.name, schema: PostSchema },
];
