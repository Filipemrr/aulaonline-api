import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../userEntity/user.entity';
import { TrilhaEntity } from '../trilhaEntity/trilha.entity';

@Entity('courses')
export class CourseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  public user: UserEntity;

  @ManyToOne(() => TrilhaEntity, trilha => trilha.courses)
  @JoinColumn({ name: 'trilhaId' })
  public trilha: TrilhaEntity;
}
