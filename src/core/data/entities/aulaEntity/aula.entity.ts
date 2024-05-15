import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn, OneToMany,
} from 'typeorm';

import { UserEntity } from '../userEntity/user.entity';
import { CourseEntity } from '../courseEntity/course.entity';
import { CommentEntity } from '../commentsEntity/comment.entity';
import { RatingEntity } from '../ratingEntity/rating.entity';

@Entity('aulas')
export class AulaEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @Column({ unique: true })
  public link: string;

  @ManyToOne(() => CourseEntity)
  @JoinColumn({ name: 'courseId' })
  public course: CourseEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  public user: UserEntity;

  @OneToMany(() => CommentEntity, comment => comment.aula)
  public comments: CommentEntity[];

  @OneToMany(() => RatingEntity, rating => rating.aula)
  public rating: RatingEntity[];
}
