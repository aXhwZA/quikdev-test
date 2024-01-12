import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import featureDB from '../../db/feature.db';
import { PostService } from '../post/post.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService, PostService],
  imports: [MongooseModule.forFeature(featureDB)],
  exports: [CommentService],
})
export class CommentModule {}
