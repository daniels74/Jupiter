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
  // UseInterceptors,
  // UploadedFile,
  Request,
  UseInterceptors,
  UploadedFile,
  // Res,
  // Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.interface';
import { Observable, catchError, from, map, of, tap } from 'rxjs';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtObj } from './model/jwt-obj.interface';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { Surfer } from './model/surfer.interface';
// import { join } from 'path';
// import { FileInterceptor } from '@nestjs/platform-express';

// const storage = {
//   storage: diskStorage({
//     destination: './uploads/profileimages',
//     filename: (req, file, cb) => {
//       const filename =
//         path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
//       const extension: string = path.parse(file.originalname).ext;

//       cb(null, `${filename}${extension}`);
//     },
//   }),
// };
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  // ! Register and return jwt object
  @Post('register')
  create(@Body() user: User): Observable<User | object> {
    return this.userService.create(user).pipe(
      map((user: User) => user),
      catchError((err) => of({ error: err.message })),
    );
  }

  // ! Login and return jwt object
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

  // ! GET USER COMMON DATA
  @Get(':id')
  findOne(@Param() params): Observable<User> {
    console.log('Looking for user with ID: ', typeof params.id);
    return this.userService.findOne(params.id);
  }

  @Get('surfer/:id')
  findSurfer(@Param('id') id: string): Observable<any> {
    return this.userService.findSurfer(Number(id));
  }

  // ! GET USER PROFILE IMAGE
  @UseGuards(JwtAuthGuard)
  @Get('uimg/userimg')
  getUserImage(@Request() req): Observable<any> {
    const user: User = req.user;
    // console.log('USer ', user);
    return this.userService.getUserImage(user.id);
  }

  //! Upload user Img
  // @UseGuards(JwtAuthGuard)
  // @Post('uploadImage')
  // uploadUserImage():

  // ! UPDATE user data
  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateOne(
    // @Param('id') userid: number,
    @Param() params,
    @Body() userupdates: any,
  ): Observable<JwtObj> {
    console.log('In controller User updates: ', userupdates);
    return this.userService.updateOne(Number(params.id), userupdates);
  }

  // ! UPDATE USER ROLE
  @hasRoles('user', 'admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('updaterole/:id')
  updateRoleOfUser(
    @Param('id') id: string,
    @Body() user: any,
  ): Observable<JwtObj> {
    return this.userService.updateRoleOfUser(Number(id), user);
  }

  // ! DELETE current USER
  @Delete(':id')
  deleteOne(@Param() id: number) {
    return this.userService.deleteOne(id);
  }

  // ! Get all Users without pagination
  // @hasRoles('admin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Get('getall')
  // findAll(): Observable<User[]> {
  //   return this.userService.findAll();
  // }

  //! GET ALL USERS with pagination
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

  // @UseGuards(JwtAuthGuard)
  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('profileImage'))
  uploadFile(
    @UploadedFile() file,
    @Param() id: any,
    @Body() userupdates: any,
  ): Observable<any> {
    // const user: User = req.user;
    console.log('USER ID:', id.id);
    // Post to database for current user
    return this.userService.updateOne(id.id, userupdates);
  }

  // @Post('newimageupload')
  // uploadCompressedImg(@UploadedFile() file, @Request() req) {
  //   const user = req.user;
  //   return this.userService
  //     .updateOne(user.id, {
  //       profileImage: file.filename,
  //     })
  //     .pipe(
  //       tap((user: any) => console.log(user)),
  //       map((user: any) => ({ profileImage: user.user.profileImage })),
  //     );
  // }

  // @Get('profile-image/:imagename')
  // findProfileImage(@Param('imagename') imagename, @Res() res): Observable<any> {
  //   return of(
  //     res.sendFile(join(process.cwd(), 'uploads/profileimages/' + imagename)),
  //   );
  // }

  //
}
