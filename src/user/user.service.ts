import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './model/user.entity';
import { Like, Repository } from 'typeorm';
import { User } from './model/user.interface';
import {
  Observable,
  catchError,
  from,
  map,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { JwtObj } from './model/jwt-obj.interface';
import { CryptoIdEnitity } from '../cryptoid/model/cryptoid.entity';
import { NftIdEntity } from '../nftid/model/nftid.entity';
import { PostEntity } from '../posting/models/post.entity';
import { Surfer } from './model/surfer.interface';
import { FriendRequestEntity } from 'src/friend-requests/Model/friendRequest.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private AuthServ: AuthService, // @InjectRepository(CryptoIdEnitity) // private readonly cryptoRepository: Repository<CryptoIdEnitity>,
  ) {}

  create(user: User): Observable<User> {
    // return from(this.userRepository.save(user));
    return this.AuthServ.hashPassword(user.password).pipe(
      switchMap((passwordHash: string) => {
        const newUser = new UserEntity();
        newUser.profileImage = user.profileImage;
        newUser.name = user.name;
        newUser.username = user.username;
        newUser.email = user.email;
        newUser.password = passwordHash;
        newUser.role = user.role;
        newUser.cryptos = <CryptoIdEnitity[]>[];
        newUser.nfts = <NftIdEntity[]>[];
        newUser.posts = <PostEntity[]>[];
        newUser.sentFriendRequests = [];
        newUser.recievedFriendRequests = [];

        return from(this.userRepository.save(newUser)).pipe(
          map((user: User) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, profileImage, ...result } = user;
            return result;
          }),
          catchError((err) => throwError(() => new Error(err))),
        );
      }),
    );
  }

  // Attepts login and returns user encoded through JWT string
  login(user: User): Observable<string> {
    return this.validateUser(user.email, user.password).pipe(
      switchMap((user) => {
        if (user) {
          const {
            name,
            username,
            email,
            password,
            role,
            cryptos,
            nfts,
            posts,
            sentFriendRequests,
            recievedFriendRequests,
            profileImage,
            ...shortUser
          } = user;
          return this.AuthServ.generateJWT(shortUser).pipe(
            map((jwt: string) => jwt),
          );
        } else {
          return of('Wrong Credentials', user);
        }
      }),
    );
  }

  // Checks if user is registerd in database and holds correct password
  // Excludes senstive and large data
  validateUser(email: string, password: string): Observable<any> {
    return this.findByMail(email).pipe(
      switchMap((user: User) =>
        this.AuthServ.comparePasswords(password, user.password).pipe(
          map((match: boolean) => {
            if (match) {
              const {
                email,
                password,
                cryptos,
                nfts,
                posts,
                sentFriendRequests,
                recievedFriendRequests,
                profileImage,
                ...result
              } = user;
              return result;
            }
            // else {
            //   throw Error;
            // }
          }),
        ),
      ),
      catchError((err) => {
        return throwError(() => new Error('Password incorrect: ' + err));
      }),
    );
  }

  // Get user from database based on email
  // Includes relted tables
  findByMail(email: string): Observable<User> {
    return from(
      this.userRepository.findOne({
        where: { email },
        relations: [
          'cryptos',
          'nfts',
          'posts',
          'sentFriendRequests',
          'recievedFriendRequests',
        ],
      }),
    );
  }

  findOne(id: number): Observable<User> {
    return from(
      this.userRepository.findOne({
        where: { id },
        relations: [
          'cryptos',
          'nfts',
          'posts',
          'sentFriendRequests',
          'recievedFriendRequests',
        ],
      }),
    ).pipe(
      map((user: User) => {
        const { password, ...result } = user;
        return result;
      }),
    );
  }

  findSurfer(id: number): Observable<Surfer> {
    return from(
      this.userRepository.findOne({
        where: { id },
        relations: ['cryptos', 'nfts', 'posts'],
      }),
    ).pipe(
      map((user) => {
        const {
          password,
          role,
          sentFriendRequests,
          recievedFriendRequests,
          ...result
        } = user;
        return result;
      }),
    );
  }

  getUserImage(id: any): Observable<any> {
    return from(
      this.userRepository.findOne({
        where: { id },
      }),
    ).pipe(
      map((user: any) => {
        const { profileImage, ...result } = user;
        return { profileImage: profileImage };
      }),
    );
  }

  deleteOne(id: any): Observable<any> {
    // return from(this.userRepository.delete(id));
    // return from(
    //   this.userRepository.query('DELETE * FROM user_entity', [ where: id ]),
    // );
    console.log('DEleting id #', typeof id.id);
    return from(
      this.userRepository
        .createQueryBuilder('DeleteCertainUser')
        .delete()
        .from(FriendRequestEntity)
        .where('creator.id = :id', { id: id.id })
        .delete()
        .from(PostEntity)
        .where('user.id = :id', { id: +id.id })
        .delete()
        .from(NftIdEntity)
        .where('user.id = :id', { id: id.id })
        .delete()
        .from(CryptoIdEnitity)
        .where('user.id = :id', { id: id.id })
        .delete()
        .from(UserEntity)
        .where('id = :id', { id: id.id })
        .execute(),
    );
  }

  // ! Will UPDATE filled in pieces and return new jwt object
  updateOne(id: any, userupdates: any): Observable<any> {
    console.log('User updates and user id', userupdates, id);
    return from(this.userRepository.update(+id, userupdates)).pipe<JwtObj>(
      switchMap(() => {
        return this.findOne(+id).pipe(
          switchMap((founduser) => {
            console.log('User found based on Id during update: ', founduser);
            const { password, profileImage, ...result } = founduser;
            return this.AuthServ.generateJWT(result).pipe(
              map((jwt: string) => {
                console.log('jwt.length: ', jwt.length);
                return { jwt: jwt };
              }),
            );
          }),
        );
      }),
    );
  }

  updateRoleOfUser(id: any, user: any): Observable<JwtObj> {
    // return from(this.userRepository.update(id, user));
    // this.userRepository.update(id, user);
    return from(this.userRepository.update(id, user)).pipe<JwtObj>(
      switchMap(() => {
        return this.findOne(id).pipe<JwtObj>(
          switchMap((foundUpdatedUser: User) => {
            return this.AuthServ.generateJWT(foundUpdatedUser).pipe(
              map((jwt: string) => {
                const obj: JwtObj = { jwt: jwt };
                return obj;
              }),
            );
          }),
        );
        // this.AuthServ.generateJWT(user).pipe(
        //   map((jwt: string) => {
        //     const obj: JwtObj = { jwt: jwt };
        //     return obj;
        //   }),
        // );
      }),
    );
    //this.AuthServ.generateJWT(user).pipe(map((jwt: string) => jwt));
  }

  findAll(): Observable<User[]> {
    // return from(this.userRepository.find());
    return from(this.userRepository.find()).pipe(
      map((users: User[]) => {
        users.forEach(function (v) {
          delete v.password;
        });
        console.log('Users found', users);
        return users;
      }),
    );
  }

  paginate(options: IPaginationOptions): Observable<Pagination<User>> {
    return from(paginate<User>(this.userRepository, options)).pipe(
      map((usersPageable: Pagination<User>) => {
        usersPageable.items.forEach(function (v) {
          delete v.password;
        });
        return usersPageable;
      }),
    );
    // const queryBuilder = this.userRepository
    //   .createQueryBuilder('user')
    //   .select('user.username', username)
    //   // .addSelect('SUM(user.liv)', 'totalLives')
    //   .orderBy('user.username', 'ASC'); // Or whatever you need to do

    // return from(paginate<User>(queryBuilder, options));
  }

  paginateFilterByUsername(
    options: IPaginationOptions,
    username: string,
  ): Observable<Pagination<User>> {
    return from(
      this.userRepository.findAndCount({
        skip: 0, //Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 1,
        order: { username: 'ASC' },
        select: ['id', 'name', 'profileImage', 'username', 'email', 'role'],
        where: [{ username: Like(`%${username}%`) }],
      }),
    ).pipe(
      map(([users, totalUsers]) => {
        console.log('USers found: ', users);
        const usersPageable: Pagination<User> = {
          items: users,
          links: {
            first: options.route + `?limit=${options.limit}`,
            previous: options.route + ``,
            next:
              options.route +
              `?limit=${options.limit}&page=${Number(options.page) + 1}`,
            last:
              options.route +
              `?limit=${options.limit}&page=${Math.ceil(
                totalUsers / Number(options.limit),
              )}`,
          },
          meta: {
            currentPage: Number(options.page),
            itemCount: users.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalUsers,
            totalPages: Math.ceil(totalUsers / Number(options.limit)),
          },
        };
        return usersPageable;
      }),
    );
  }
}
