import { Injectable } from '@nestjs/common';
import { AuthService } from '../../../auth/auth.service';
import { UserService } from '../../../user/user.service';
import { Observable, from, map, switchMap } from 'rxjs';
import { User } from 'src/user/model/user.interface';
import { Repository } from 'typeorm';
import { NftIdEntity } from 'src/nftid/model/nftid.entity';
import { nftId } from 'src/nftid/model/nftid.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NftidService {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    @InjectRepository(NftIdEntity)
    private readonly nftRepository: Repository<NftIdEntity>,
  ) {}

  create(user: User, nftEntry: nftId): Observable<any> {
    nftEntry.user = user;
    return from(this.nftRepository.save(nftEntry)).pipe(
      switchMap((res) => {
        return this.userService.findOne(user.id).pipe(
          switchMap((founduser) => {
            return this.authService.generateJWT(founduser).pipe<any>(
              map((jwtres: string) => {
                return { jwt: jwtres };
              }),
            );
          }),
        );
      }),
    );
  }
}
