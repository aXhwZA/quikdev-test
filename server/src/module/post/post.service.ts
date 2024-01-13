import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './entities/post.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) { }

  create(createPostDto: CreatePostDto) {
    return this.postModel.create({ ...createPostDto });
  }

  findAll() {
    return this.postModel
      .find()
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          model: 'User',
          select: 'name',
        },
      })
      .populate({ path: 'user', select: 'name _id image' });
  }

  findOne(id: string) {
    return this.postModel
      .findById(id)
      .find()
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          model: 'User',
          select: 'name image',
        },
      })
      .populate({ path: 'user', select: 'name _id image' });
  }

  update(id: string, updatePostDto: UpdatePostDto | any) {
    return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true });
  }

  remove(id: string) {
    return this.postModel.findByIdAndDelete(id);
  }
}
