import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../../common/base/base.entity';

@Entity()
export class TeamEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  createdBy: string;
  @Column({ nullable: true })
  currentSessionId?: string;
}
