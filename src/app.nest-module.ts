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
      url: process.env.DATABASE_URL,
      username: 'avnadmin',
      password: 'AVNS_8nKnzYUVSrTUVpIv3G0',
      host: 'coldjupiter-coldjup.k.aivencloud.com',
      port: 12878,
      database: 'defaultdb',
      ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIETTCCArWgAwIBAgIUTDCMCKQZkRatsVMDtgPO0wE/oEkwDQYJKoZIhvcNAQEM
BQAwQDE+MDwGA1UEAww1OGRmZDg1N2ItMjViZC00MGRkLWEzZWYtZjUxNTI4YmFi
MDc3IEdFTiAxIFByb2plY3QgQ0EwHhcNMjUwMjExMjMzODUwWhcNMzUwMjA5MjMz
ODUwWjBAMT4wPAYDVQQDDDU4ZGZkODU3Yi0yNWJkLTQwZGQtYTNlZi1mNTE1Mjhi
YWIwNzcgR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
AYoCggGBAOfteES9Bgx0woMZybMCHa4kGxhTpkwOTjuWHJmIe2cHOLISo3TBp58B
8aldRpNGAfrOoqXR6LIs9livBOiBCv0TW4wv3ddfs0b8D/dfzhG7jAMLCAUo20dx
VUyYpTVc/ADH8OwyHUGxNHqke7a4EWyE9gUoFr0YXdh25/XpGC5vfj74X5juFznB
G835b8FZQYcA502ItXU13FKx1X2OEAdRXSK/ELN+UrpBXTcRiH1cR/4Z03lu+lCK
5pZtT9Jz0zzZTi8NGc+1ZsQe/8EzD9lvc2whR1y1PWhwnNwFSb6b1ytA4NV6q2wB
sjncyzd333oQZVoxSmwVij25m/2Dzqh4n/LwEWZVS7QqviQ68wc9s/+LkxsGy97n
Mu+0NTG2YOGCBbXJ5k2q5eQc/DS3GJFcFlHeegLYp1GmWGoSF3FH3VFAkgE++j/h
Fm3qvT9izy3gyaUR8SkDu3lMUwfYv95U0/xbIsdMdbDb7y2YuLCVJsU2QShDABVx
aQKVOzkKYwIDAQABoz8wPTAdBgNVHQ4EFgQUA9X7kp+ETeI0mcGZS8YU5rTHu/Uw
DwYDVR0TBAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGB
ALTazPH4EnbtkyCXUNGLfBLUFsVqt/2enUGPwi2hbAc2+ZYmnB+XzRPC9UxAxO+Z
1vwguA6ytheai4rDTEuPuBOm3/6ayk3q9q60U/TFvzk4hIZ7nZ0/OiZhtOeAPJsv
V8gBXPTOGs4uI6nh3jgYbz2gAUzPUiQoVOT7eUEbkQfGusbk/tosquTsJAW4uYyi
K7jFSSApC7AoRxUHFpEdYZ8Vc/en2QpWIbxxM1bp8UYgQ+6siEOovDSPuKQuq3V1
dBTefrdfcgl4yCuNbnOeujSdWfi31A+2kTOFv6mP/ETdBM83ZARB6Ur0JcfLOrBy
2mSyFX2cPufU/cdsa8YzgaUTfvN9wp2+2/9JjhlRAFdhscmerIvVNuWGOxLT4mWK
mSAc5Y3L3DTtuRxtWvQI9g4N8LM81gD5c01s8QqoqjkWjeJ7AX/jVs9RFVCaC9LG
c5lnvm0GsIE26SiUb7qjUznDAyHlK3mehEYg9tfFYFfNc1mKJz3xRkhE8X74Iz3p
Yw==
-----END CERTIFICATE-----`,
      },
      // ! used for local db on mac, doesnt work with SSL locally.
      // type: 'postgres',
      // host: 'localhost',
      // port: 5432,
      // username: 'charlie',
      // password: 'DanielCE4774!',
      // database: 'zappupp',
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
export class AppModule {
  // constructor(private dataSource: DataSource) {}
}
