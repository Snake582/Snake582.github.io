import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Revenu {
    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('decimal')
  amount: number;

  @Column()
  type: string;
}
