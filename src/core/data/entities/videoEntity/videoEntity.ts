import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { UserEntity } from '../userEntity/user.entity';
import { NotationEntity } from '../noteEntity/note.entity';

@Entity()
export class VideoEntity {
  @PrimaryGeneratedColumn()
  video_id!: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @Column()
  title!: string;

  @Column()
  video_link!: string;

  @Column()
  video_thumb_url!: string;

  @OneToOne(() => NotationEntity, (notation) => notation.video, {
    nullable: true,
  })
  @JoinColumn({ name: 'notation' })
  notation!: NotationEntity | null;
}
