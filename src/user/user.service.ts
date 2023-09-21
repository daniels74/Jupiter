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
  mergeMap,
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
import { error } from 'console';
import { CryptoIdEnitity } from '../cryptoid/model/cryptoid.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private AuthServ: AuthService, // @InjectRepository(CryptoIdEnitity) // private readonly cryptoRepository: Repository<CryptoIdEnitity>,
  ) {}

  // cryptoposter(user: User, cryptoId: number): Observable<CryptoIdEnitity> {
  //   const cryptoEntity = new CryptoIdEnitity();
  //   const userentity = new UserEntity();
  //   userentity.id = user.id;
  //   cryptoEntity.cryptoid = cryptoId;
  //   cryptoEntity.user = userentity;

  //   return from(this.cryptoRepository.save(cryptoEntity)).pipe(
  //     map((res) => {
  //       return res;
  //     }),
  //   );
  // }

  // getAllCryptoIds(myuser: User): Observable<CryptoIdEnitity[]> {
  //   return from(this.cryptoRepository.find());
  // }

  create(user: User): Observable<User> {
    // return from(this.userRepository.save(user));
    return this.AuthServ.hashPassword(user.password).pipe(
      switchMap((passwordHash: string) => {
        const newUser = new UserEntity();
        newUser.name = user.name;
        newUser.username = user.username;
        newUser.email = user.email;
        newUser.password = passwordHash;
        newUser.role = user.role;
        newUser.cryptos = <CryptoIdEnitity[]>[];

        return from(this.userRepository.save(newUser)).pipe(
          map((user: User) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
          }),
          catchError((err) => throwError(() => new Error(err))),
        );
      }),
    );
  }

  findOne(id: number): Observable<User> {
    // return from(this.userRepository.findOne({ where: { id } }));
    return from(
      this.userRepository.findOne({ where: { id }, relations: ['cryptos'] }),
    ).pipe(
      map((user: User) => {
        // console.log('FindOne-Database: ', user);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }),
    );
  }

  findAll(): Observable<User[]> {
    // return from(this.userRepository.find());
    return from(this.userRepository.find()).pipe(
      map((users: User[]) => {
        users.forEach(function (v) {
          delete v.password;
        });
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
  }

  paginateFilterByUsername(
    options: IPaginationOptions,
    username: any,
  ): Observable<Pagination<User>> {
    return from(
      this.userRepository.findAndCount({
        skip: Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 10,
        order: { id: 'ASC' },
        select: ['id', 'name', 'username', 'email', 'role'],
        where: [{ username: Like(`%${username}%`) }],
      }),
    ).pipe(
      map(([users, totalUsers]) => {
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

  deleteOne(id: number): Observable<any> {
    return from(this.userRepository.delete(id));
  }

  updateOne(id: any, user: any): Observable<JwtObj> {
    // return from(this.userRepository.update(id, user));
    // delete user.email;
    // delete user.password;
    console.log('USer update and id', user, id);
    return from(
      this.userRepository.update(+id, {
        name: user.name,
        username: user.username,
      }),
    ).pipe<JwtObj>(
      switchMap(() => {
        return this.findOne(+id).pipe(
          switchMap((founduser) => {
            return this.AuthServ.generateJWT(founduser).pipe(
              map((jwt: string) => {
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

  login(user: User): Observable<string> {
    return this.validateUser(user.email, user.password).pipe(
      switchMap((user: User) => {
        if (user) {
          // console.log('LoggingIn: ', user);
          return this.AuthServ.generateJWT(user).pipe(
            map((jwt: string) => jwt),
          );
        } else {
          return 'Wrong Credentials';
        }
      }),
    );
  }

  validateUser(email: string, password: string): Observable<User> {
    return this.findByMail(email).pipe(
      switchMap((user: User) =>
        this.AuthServ.comparePasswords(password, user.password).pipe(
          map((match: boolean) => {
            if (match) {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { password, ...result } = user;
              return result;
            } else {
              throw Error;
            }
          }),
        ),
      ),
      catchError((err) => {
        return throwError(() => new Error('ErrorBro' + err));
      }),
    );
  }

  findByMail(email: string): Observable<User> {
    return from(
      this.userRepository.findOne({ where: { email }, relations: ['cryptos'] }),
    );
  }
}
