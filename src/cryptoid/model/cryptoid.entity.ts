import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/model/user.entity';

@Entity('cryptoid_entry')
export class CryptoIdEnitity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  cryptoid: string;

  @ManyToOne((type) => UserEntity, (userentity) => userentity.cryptos)
  user: UserEntity;
}
