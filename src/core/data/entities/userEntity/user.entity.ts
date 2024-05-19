import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { NotationEntity } from '../noteEntity/notation.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToMany(() => NotationEntity, (notation) => notation.user)
  notations!: NotationEntity[];

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column({ nullable: true })
  public refreshToken: string;
}
