import { Module } from '@nestjs/common';
import { NftidService } from './service/nftid/nftid.service';
import { NftidController } from './controller/nftid/nftid.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftIdEntity } from './model/nftid.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([NftIdEntity]), AuthModule, UserModule],
  controllers: [NftidController],
  providers: [NftidService],
})
export class NftidModule {}
