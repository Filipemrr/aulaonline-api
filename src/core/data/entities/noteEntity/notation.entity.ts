import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../userEntity/user.entity';
import { VideoEntity } from '../videoEntity/video.entity';

@Entity()
export class NotationEntity {
  @PrimaryGeneratedColumn()
  annotation_id!: number;

  @Column('text')
  body!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'autor' })
  user!: UserEntity;

  @ManyToOne(() => VideoEntity)
  @JoinColumn({ name: 'video_id' })
  notation!: VideoEntity;
}
