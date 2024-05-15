import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../userEntity/user.entity';
import { AulaEntity } from '../aulaEntity/aula.entity';

@Entity('ratings')
export class RatingEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'int',
    default: 0,
    width: 1,
    comment: 'Estrelas da avaliação, de 0 a 5',
  })
  public stars: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  public user: UserEntity;

  @ManyToOne(() => AulaEntity)
  @JoinColumn({ name: 'aulaId' })
  public aula: AulaEntity;
}
