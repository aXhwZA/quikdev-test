import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, CommentDocument } from './entities/comment.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostService } from '../post/post.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    private readonly postService: PostService,
  ) {}

  async create(createCommentDto: CreateCommentDto, user: any) {
    const sendComment = { ...createCommentDto };

    delete sendComment.repliesId;

    const newComment = await this.commentModel.create({ ...sendComment });

    await this.postService.update(
      createCommentDto.postId,
      {
        $push: { commentId: newComment._id },
      },
      user,
      true,
    );

    if (createCommentDto.repliesId) {
      await this.commentModel.updateOne(
        { _id: createCommentDto.repliesId },
        { $push: { repliesId: newComment._id } },
      );
    }

    return newComment;
  }

  findAll() {
    return this.commentModel
      .find()
      .populate({
        path: 'replies',
        populate: {
          path: 'user',
          model: 'User',
          select: 'name image',
        },
      })
      .populate({ path: 'user', select: 'name _id image' })
      .sort({ createdAt: -1 });
  }

  findOne(id: string) {
    return this.commentModel
      .findById(id)
      .populate({
        path: 'replies',
        populate: {
          path: 'user',
          model: 'User',
          select: 'name image',
        },
      })
      .populate({ path: 'user', select: 'name _id image' });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto, user: any) {
    await this.validateUserEdit(id, user);

    return this.commentModel.findByIdAndUpdate(id, updateCommentDto, {
      new: true,
    });
  }

  async remove(id: string, user: any) {
    await this.validateUserEdit(id, user);

    const comment = await this.commentModel.findById(id);

    await this.commentModel.deleteMany({ _id: { $in: comment.repliesId } });

    return this.commentModel.findByIdAndDelete(id);
  }

  async validateUserEdit(id: string, user: any) {
    const comment: any = await this.findOne(id);
    const post: any = await this.postService.findOne(comment?.postId);

    if (
      user?.id !== String(comment?.userId) &&
      user?.id !== String(post?.[0]?.userId)
    ) {
      throw new HttpException(
        'You cannot edit another user comment.',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
