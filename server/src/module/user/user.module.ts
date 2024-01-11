import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import featureDB from '../../db/feature.db';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [MongooseModule.forFeature(featureDB)],
})
export class UserModule {}
