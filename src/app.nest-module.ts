import { Module } from '@nestjs/common';
import { AppController } from './app.nest-contoller';
import { AppService } from './app.nest-service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CryptoidModule } from './cryptoid/cryptoid.module';
import { NftidModule } from './nftid/nftid.module';
import { PostingModule } from './posting/posting.module';
import { FriendRequestsModule } from './friend-requests/friend-requests.module';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '../../', 'front'),
    // }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    CryptoidModule,
    NftidModule,
    PostingModule,
    FriendRequestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
