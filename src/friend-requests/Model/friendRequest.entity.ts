import { UserEntity } from 'src/user/model/user.entity';
import { User } from 'src/user/model/user.interface';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FriendRequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.sentFriendRequests)
  creator: User;

  @ManyToOne(() => UserEntity, (user) => user.recievedFriendRequests)
  reciever: User;

  @Column()
  status: string;
}
