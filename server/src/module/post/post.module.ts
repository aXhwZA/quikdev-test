import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import featureDB from '../../db/feature.db';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [MongooseModule.forFeature(featureDB)],
})
export class PostModule {}
