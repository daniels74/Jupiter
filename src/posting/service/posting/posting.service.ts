import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../../../posting/models/post.entity';
import { PostInterface } from 'src/posting/models/post.interface';
import { User } from 'src/user/model/user.interface';
import { Repository } from 'typeorm';
import { from, switchMap, map, Observable, mergeMap, throwError } from 'rxjs';
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
    return from(this.postingRepository.save(userPost));
  }
  // .pipe(
  //   switchMap((res) => {
  //     return this.userService.findOne(user.id).pipe(
  //       switchMap((founduser) => {
  //         console.log('founduser: ', founduser);
  //         const { profileImage, password, ...restOfUser } = founduser;
  //         return this.authService.generateJWT(restOfUser).pipe<any>(
  //           map((jwtres: string) => {
  //             console.log('post jwtres.length: ', jwtres.length);
  //             return { jwt: jwtres };
  //           }),
  //         );
  //       }),
  //     );
  //   }),
  // );
  //}

  getUserPosts(userid: number): Observable<PostInterface[]> {
    return from(
      this.postingRepository.find({
        where: { user: { id: userid } },
        relations: { user: true },
      }),
    );
  }

  // posting.service.ts

  deletePost(postId: number, userId: number): Observable<any> {
    return from(
      this.postingRepository.findOne({
        where: { id: postId },
        relations: { user: true },
      }),
    ).pipe(
      mergeMap((post) => {
        if (!post) {
          return throwError(() => new Error('Post not found'));
        }
        if (post.user.id !== userId) {
          return throwError(
            () => new Error('Unauthorized: You can only delete your own posts'),
          );
        }

        return from(this.postingRepository.delete(postId));
      }),
    );
  }

  updatePost(
    postId: number,
    updatedPost: PostInterface,
    userId: number,
  ): Observable<any> {
    return from(
      this.postingRepository.findOne({
        where: { id: postId },
        relations: { user: true },
      }),
    ).pipe(
      mergeMap((post) => {
        if (!post) {
          return throwError(() => new Error('Post not found'));
        }
        if (post.user.id !== userId) {
          return throwError(
            () => new Error('Unauthorized: You can only edit your own posts'),
          );
        }
        post.description = updatedPost.description;
        return from(this.postingRepository.save(post));
      }),
    );
  }
}
