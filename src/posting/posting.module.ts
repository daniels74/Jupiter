import { Module } from '@nestjs/common';
import { PostingController } from './controller/posting/posting.controller';
import { PostingService } from './service/posting/posting.service';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './models/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), AuthModule, UserModule],
  controllers: [PostingController],
  providers: [PostingService],
})
export class PostingModule {}
