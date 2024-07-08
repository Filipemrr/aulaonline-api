import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Video extends BaseEntity {
  @PrimaryGeneratedColumn()
  video_id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column()
  title!: string;

  @Column()
  video_thumb_url!: string;

  @Column()
  total_time!: number;

  @Column()
  video_link!: string;
}