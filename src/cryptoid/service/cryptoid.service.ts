import { Inject, Injectable } from '@nestjs/common';
import { cryptoidEntry } from '../model/cryptoid.interface';
import { User } from 'src/user/model/user.interface';
import { Observable, from, map, switchMap } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoIdEnitity } from '../model/cryptoid.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../user/user.service';
import { AuthService } from '../../auth/auth.service';
import { JwtObj } from '../../user/model/jwt-obj.interface';

@Injectable()
export class CryptoidService {
  constructor(
    @InjectRepository(CryptoIdEnitity)
    private readonly cryptoRepository: Repository<CryptoIdEnitity>,
    private userService: UserService,
    private authService: AuthService,
  ) {}

  create(user: User, cryptoEntry: cryptoidEntry): Observable<any> {
    // Claim ownership of entry by user in it.
    cryptoEntry.user = user;
    return from(this.cryptoRepository.save(cryptoEntry));
    // .pipe(
    //   switchMap((res) => {
    //     return this.userService.findOne(user.id).pipe<any>(
    //       switchMap((founduser) => {
    //         return this.authService.generateJWT(founduser).pipe<any>(
    //           map((jwtres: string) => {
    //             return { jwt: jwtres };
    //           }),
    //         );
    //       }),
    //     );
    //   }),
    // );
  }

  findAll(): Observable<cryptoidEntry[]> {
    return from(this.cryptoRepository.find());
  }

  findByUser(userId: number): Observable<cryptoidEntry[]> {
    return from(
      this.cryptoRepository.find({
        where: {
          user: {
            id: userId,
          },
        },
        relations: {
          user: true,
        },
      }),
    );
  }

  deleteUserCryptoEntry(user: User, cryptoid: string): Observable<any> {
    return from(this.cryptoRepository.delete({ cryptoid: cryptoid }));
    //.pipe(
    // switchMap((deleteRes) => {
    //  return this.userService.findOne(user.id);
    // .pipe(
    //   switchMap((foundUser) => {
    //     return this.authService.generateJWT(foundUser).pipe(
    //       map((jwt: string) => {
    //         return { jwt: jwt };
    //       }),
    //     );
    //   }),
    // );
    // }),
    //);
  }

  deleteUserCryptoEntryById(user: User, entryId: number): Observable<any> {
    return from(this.cryptoRepository.delete(entryId)).pipe(
      switchMap((deleteRes) => {
        return this.userService.findOne(user.id).pipe(
          switchMap((foundUser) => {
            return this.authService.generateJWT(foundUser).pipe(
              map((jwt: string) => {
                return { jwt: jwt };
              }),
            );
          }),
        );
      }),
    );
  }
}
