import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { cryptoidEntry } from '../model/cryptoid.interface';
import { Observable } from 'rxjs';
import { CryptoidService } from '../service/cryptoid.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { CryptoIdEnitity } from '../model/cryptoid.entity';
import { User } from '../../user/model/user.interface';

@Controller('cryptoid')
export class CryptoidController {
  constructor(private cryptoService: CryptoidService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() cryptoid: cryptoidEntry, @Request() req): Observable<any> {
    const user = req.user;
    return this.cryptoService.create(user, cryptoid);
  }

  @Get()
  findCryptoidEntries(
    @Query('userId') userId: number,
  ): Observable<cryptoidEntry[]> {
    if (userId == null) {
      console.log('hello');
      return this.cryptoService.findAll();
    }
    console.log('helloo');
    return this.cryptoService.findByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('entrydelete/cryptoid/:id')
  deleteCryptoId(@Param('id') cryptoid: string, @Request() req) {
    const user = req.user;
    return this.cryptoService.deleteUserCryptoEntry(user, cryptoid);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('entrydelete/:id')
  deleteEntryById(@Param('id') cryptoid: number, @Request() req) {
    const user = req.user;
    return this.cryptoService.deleteUserCryptoEntryById(user, +cryptoid);
  }
}
