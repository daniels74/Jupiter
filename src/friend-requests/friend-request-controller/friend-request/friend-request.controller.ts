import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { FriendRequestService } from 'src/friend-requests/friend-request-service/friend-request.service';
import { User } from 'src/user/model/user.interface';

@Controller('friendrequest')
export class FriendRequestController {
  constructor(private friendReqService: FriendRequestService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  sendFriendRequest(@Body() User: User, @Request() req) {
    const sender = req.user;
    return this.friendReqService.sendFriendRequest(sender, User);
  }

  @UseGuards(JwtAuthGuard)
  @Get('myfriendrequests')
  getAllUserFriendRequests(@Request() req) {
    const currentUser = req.user;
    return this.friendReqService.getAllFriendRequests(currentUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('mysentfriendrequests')
  getAllUserSentFriendRequests(@Request() req) {
    const currentUser = req.user;
    return this.friendReqService.getAllSentFriendRequests(currentUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post('acceptFriend')
  acceptFriendRequest(@Body() requestId: number) {
    return this.friendReqService.acceptFriendRequest(requestId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('denyFriend')
  denyFriendRequest(@Body() requestId: number) {
    return this.friendReqService.denyFriendRequest(requestId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('cancelfriendrequest')
  cancelFriendRequest(@Request() req, @Body() otherUser: User) {
    const currentUser = req.user;
    return this.friendReqService.cancelFriendRequest(currentUser, otherUser);
  }
}
