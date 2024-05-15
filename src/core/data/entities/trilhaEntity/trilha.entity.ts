import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CourseEntity } from '../courseEntity/course.entity';

@Entity('trilha')
export class TrilhaEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @OneToMany(() => CourseEntity, course => course.trilha)
  public courses: CourseEntity[];
}
