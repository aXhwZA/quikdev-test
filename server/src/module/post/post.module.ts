import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from '../user/user.service';
import featureDB from '../../db/feature.db';
import { CommentService } from '../comment/comment.service';

@Module({
  controllers: [PostController],
  providers: [PostService, UserService, CommentService],
  imports: [MongooseModule.forFeature(featureDB)],
  exports: [PostService],
})
export class PostModule {}
