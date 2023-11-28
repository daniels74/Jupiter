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
  UseInterceptors,
  UploadedFile,
  Request,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtObj } from './model/jwt-obj.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';

const storage = {
  storage: diskStorage({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      const filename =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

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

    // If user typees a name -> filter all users to that name
    if (username === null || username === undefined) {
      return this.userService.paginate({
        page: Number(page),
        limit: Number(limit),
        route: 'http://localhost:3000/user',
      });
    } else {
      // No user input -> retrieve all users
      console.log('username', username);
      return this.userService.paginateFilterByUsername(
        {
          page: Number(page),
          limit: Number(limit),
          route: 'http://localhost:3000/user',
        },
        username,
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

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadImage(@UploadedFile() file, @Request() req): Observable<any> {
    const user: User = req.user;
    // Post to database for current user
    return this.userService
      .updateOne(user.id, {
        profileImage: file.filename,
      })
      .pipe(
        tap((user: any) => console.log(user)),
        map((user: any) => ({ profileImage: user.user.profileImage })),
      );
    // return of({ imagePath: file.filename });
  }

  @Post('newimageupload')
  uploadCompressedImg(@UploadedFile() file, @Request() req) {
    const user = req.user;
    return this.userService
      .updateOne(user.id, {
        profileImage: file.filename,
      })
      .pipe(
        tap((user: any) => console.log(user)),
        map((user: any) => ({ profileImage: user.user.profileImage })),
      );
  }

  @Get('profile-image/:imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res): Observable<any> {
    return of(
      res.sendFile(join(process.cwd(), 'uploads/profileimages/' + imagename)),
    );
  }
}
