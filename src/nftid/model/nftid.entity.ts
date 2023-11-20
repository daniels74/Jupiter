import { UserEntity } from 'src/user/model/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('nftid_entry')
export class NftIdEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nftid: string;

  @ManyToOne((type) => UserEntity, (userentity) => userentity.nfts, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
