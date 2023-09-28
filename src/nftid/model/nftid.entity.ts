import { UserEntity } from 'src/user/model/user.entity';
import { User } from '../../user/model/user.interface';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('nftid_entry')
export class NftIdEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nftid: string;

  @ManyToOne((type) => UserEntity, (userentity) => userentity)
  user: User;
}
