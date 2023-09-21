import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Query,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.interface';
import { Observable, catchError, map, of } from 'rxjs';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtObj } from './model/jwt-obj.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @Post('postcrypto')
  // cryptoposter(
  //   @Body('id') user: User,
  //   @Body('cryptoId') id: number,
  // ): Observable<any> {
  //   return this.userService.cryptoposter(user, id);
  // }

  // @Get('mycryptos')
  // getAllCryptoIds(@Body('id') user: User): Observable<any> {
  //   return this.userService.getAllCryptoIds(user);
  // }

  @Post('register')
  create(@Body() user: User): Observable<User | object> {
    return this.userService.create(user).pipe(
      map((user: User) => user),
      catchError((err) => of({ error: err.message })),
    );
  }

  @Post('login')
  login(@Body() user: User): Observable<object> {
    return this.userService.login(user).pipe(
      map((jwt) => {
        return {
          jwt: jwt,
        };
      }),
    );
  }

  @Get(':id')
  findOne(@Param() params): Observable<User> {
    return this.userService.findOne(params.id);
  }

  // @hasRoles('admin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Get()
  // findAll(): Observable<User[]> {
  //   return this.userService.findAll();
  // }
  @Get()
  index(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('username') username: string,
  ): Observable<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;

    if (username === null || username === undefined) {
      return this.userService.paginate({
        page: Number(page),
        limit: Number(limit),
        route: 'http://localhost:3000/api/users',
      });
    } else {
      return this.userService.paginateFilterByUsername(
        {
          page: Number(page),
          limit: Number(limit),
          route: 'http://localhost:3000/api/users',
        },
        { username },
      );
    }
  }

  @Delete(':id')
  deleteOne(@Param() id: number) {
    return this.userService.deleteOne(id);
  }

  @Patch(':id')
  updateOne(
    @Param('id') userid: any,
    @Body() userupdates: any,
  ): Observable<JwtObj> {
    return this.userService.updateOne(userid, userupdates);
  }

  @hasRoles('user', 'admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('updaterole/:id')
  updateRoleOfUser(
    @Param('id') id: string,
    @Body() user: any,
  ): Observable<JwtObj> {
    return this.userService.updateRoleOfUser(Number(id), user);
  }
}
