import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class GameInstanceEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  gameId: string;
  @Column()
  teamId: string;
}
