import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoIdEnitity } from './model/cryptoid.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { CryptoidController } from './controller/cryptoid.controller';
import { CryptoidService } from './service/cryptoid.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CryptoIdEnitity]),
    AuthModule,
    UserModule,
  ],
  controllers: [CryptoidController],
  providers: [CryptoidService],
})
export class CryptoidModule {}
