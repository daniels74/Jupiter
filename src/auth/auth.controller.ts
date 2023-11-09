import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface tokenObj {
  token: string;
}
@Controller('auth')
export class AuthController {
  constructor(private AuthServ: AuthService) {}

  @Post('jwtverification')
  validateJwt(@Body() token: tokenObj): Observable<boolean> {
    return this.AuthServ.validateJWT(token.token);
  }
}
