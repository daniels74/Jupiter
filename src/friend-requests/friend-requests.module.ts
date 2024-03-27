import { Module } from '@nestjs/common';
import { FriendRequestService } from './friend-request-service/friend-request.service';
import { FriendRequestController } from './friend-request-controller/friend-request/friend-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequestEntity } from './Model/friendRequest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FriendRequestEntity])],
  providers: [FriendRequestService],
  controllers: [FriendRequestController],
})
export class FriendRequestsModule {}
