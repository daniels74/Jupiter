import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, defer, from, of } from 'rxjs';
import { User } from 'src/user/model/user.interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateJWT(user: User): Observable<string> {
    return from(this.jwtService.signAsync({ user }));
  }

  hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 12)); //defer(() => from(bcrypt.hash(password, 12)));
  }
  comparePasswords(newPassword: string, passwordHash: string): Observable<any> {
    return from(bcrypt.compare(newPassword, passwordHash));
    // return of<any | boolean>(bcrypt.compare(newPassword, passwordHash));
  }

  validateJWT(jwt: string): Observable<boolean> {
    const validationStatus = this.jwtService.verify(jwt);
    if (validationStatus) {
      return of(true);
    } else return of(false);
  }
}
