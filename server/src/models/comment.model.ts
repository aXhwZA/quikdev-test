import mongoose, { Schema } from 'mongoose';
import { CommentDocument } from '../module/comment/entities/comment.entity';

const CommentSchema = new Schema<CommentDocument>();

const Comment = mongoose.model<CommentDocument>('comment', CommentSchema);

export default Comment;
