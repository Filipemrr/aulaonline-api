import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './userEntitie';
import { Video } from './videoEntitie';

@Entity()
export class Annotation extends BaseEntity {
  @PrimaryGeneratedColumn()
  annotation_id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Video)
  @JoinColumn({ name: 'video_id' })
  video!: Video;

  @Column()
  tittle!: string;

  @Column('text')
  body!: string;
}
