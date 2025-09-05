import { UserEntity } from 'src/user/model/user.entity';
import { User } from 'src/user/model/user.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('post_entry')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne((type) => UserEntity, (userentity) => userentity.posts, {
    onDelete: 'CASCADE',
  })
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date; // 👈 auto-filled when note is created

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date; // 👈 auto-updated whenever note changes
}
