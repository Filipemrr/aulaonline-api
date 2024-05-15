import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../userEntity/user.entity';
import { AulaEntity } from '../aulaEntity/aula.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false })
  public comment: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  public user: UserEntity;

  @ManyToOne(() => AulaEntity)
  @JoinColumn({ name: 'aulaId' })
  public aula: AulaEntity;
}
