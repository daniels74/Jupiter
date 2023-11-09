import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { PostingService } from '../../../posting/service/posting/posting.service';
import { User } from '../../../user/model/user.interface';
import { PostInterface } from '../../../posting/models/post.interface';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from '../../../auth/guards/jwt-guard';

@Controller('posting')
export class PostingController {
  constructor(private postingService: PostingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  saveNewPost(
    @Body() userPost: PostInterface,
    @Request() req,
  ): Observable<any> {
    const user = req.user;
    return this.postingService.saveNewPost(user, userPost);
  }
}
