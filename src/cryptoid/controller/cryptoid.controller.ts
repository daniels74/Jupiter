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

@Controller('cryptoid')
export class CryptoidController {
  constructor(private cryptoService: CryptoidService) {}

  @Get()
  findCryptoidEntries(
    @Query('userId') userId: string,
  ): Observable<cryptoidEntry[]> {
    return this.cryptoService.findByUser(Number(userId));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() cryptoid: cryptoidEntry, @Request() req): Observable<any> {
    const user = req.user;
    return this.cryptoService.create(user, cryptoid);
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

  // @Get('cryptoimg')
  // getImg(@Body('url') url: string) {
  //   return this.http.get();
  // }
}
