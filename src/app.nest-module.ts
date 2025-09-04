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
// import { DataSource } from 'typeorm';

@Module({
  imports: [
    // ! if running locally, Make sure you comment this out.
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'front'),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.HEROKU_POSTGRESQL_JADE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
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
