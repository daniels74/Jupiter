import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from './user.interface';
import { CryptoIdEnitity } from '../../cryptoid/model/cryptoid.entity';
import { NftIdEntity } from 'src/nftid/model/nftid.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => CryptoIdEnitity, (crypto) => crypto.user)
  cryptos: CryptoIdEnitity[];

  @OneToMany(() => NftIdEntity, (nft) => nft.user)
  nfts: NftIdEntity[];

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLocaleLowerCase();
  }
}
