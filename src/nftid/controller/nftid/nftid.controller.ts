import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { cryptoidEntry } from 'src/cryptoid/model/cryptoid.interface';
import { NftidService } from '../../../nftid/service/nftid/nftid.service';
import { nftId } from 'src/nftid/model/nftid.interface';

@Controller('nftid')
export class NftidController {
  constructor(private nftService: NftidService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() nftId: nftId, @Request() req): Observable<any> {
    const user = req.user;
    return this.nftService.create(user, nftId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('entrydelete/nftid/:id')
  deleteCryptoId(@Param('id') nftid: string, @Request() req) {
    const user = req.user;
    return this.nftService.deleteUserNftEntry(user, nftid);
  }
}
