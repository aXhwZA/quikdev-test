import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './entities/post.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  create(createPostDto: CreatePostDto) {
    return this.postModel.create({ ...createPostDto });
  }

  findAll() {
    return this.postModel
      .find()
      .populate({
        path: 'comments',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'user',
          model: 'User',
          select: 'name',
        },
      })
      .populate({ path: 'user', select: 'name _id image' })
      .sort({ createdAt: -1 });
  }

  findOne(id: string) {
    return this.postModel
      .findById(id)
      .find()
      .populate({
        path: 'comments',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'user',
          model: 'User',
          select: 'name image',
        },
      })
      .populate({ path: 'user', select: 'name _id image' });
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto | any,
    user: any,
    machine?: boolean,
  ) {
    await this.validatePostUser(id, user, machine);
    return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true });
  }

  async remove(id: string, user: any) {
    await this.validatePostUser(id, user);
    return this.postModel.findByIdAndDelete(id);
  }

  async getPostsReport(): Promise<any[]> {
    const posts = await this.postModel.find().populate({
      path: 'comments',
      populate: {
        path: 'user',
        model: 'User',
        select: 'name image',
      },
    });

    const report = posts.map((post: any) => ({
      postId: post.id,
      postTitle: post.title,
      commentsCount: post.comments?.length,
    }));

    return report;
  }

  async validatePostUser(id: string, user: any, machine?: boolean) {
    if (machine) return;

    const post: any = await this.findOne(id);

    if (String(post?.[0]?.userId) != user?.id) {
      throw new HttpException(
        'You cannot edit another user post.',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
