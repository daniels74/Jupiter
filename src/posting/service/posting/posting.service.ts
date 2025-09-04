import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../../../posting/models/post.entity';
import { PostInterface } from 'src/posting/models/post.interface';
import { User } from 'src/user/model/user.interface';
import { Repository } from 'typeorm';
import { from, switchMap, map, Observable } from 'rxjs';
import { UserService } from '../../../user/user.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class PostingService {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    @InjectRepository(PostEntity)
    private readonly postingRepository: Repository<PostEntity>,
  ) {}

  saveNewPost(user: User, userPost: PostInterface): Observable<any> {
    userPost.user = user;
    return from(this.postingRepository.save(userPost)).pipe(
      switchMap((res) => {
        return this.userService.findOne(user.id).pipe(
          switchMap((founduser) => {
            console.log('founduser: ', founduser);
            const { profileImage, password, ...restOfUser } = founduser;
            return this.authService.generateJWT(restOfUser).pipe<any>(
              map((jwtres: string) => {
                console.log('post jwtres.length: ', jwtres.length);
                return { jwt: jwtres };
              }),
            );
          }),
        );
      }),
    );
  }

  getUserPosts(userid: number): Observable<PostInterface[]> {
    return from(
      this.postingRepository.find({
        where: { user: { id: userid } },
        relations: { user: true },
      }),
    );
  }
}
