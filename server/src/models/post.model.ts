import mongoose, { Schema } from 'mongoose';
import { PostDocument } from 'src/module/post/entities/post.entity';

const PostSchema = new Schema<PostDocument>();

const Post = mongoose.model<PostDocument>('Post', PostSchema);

export default Post;
