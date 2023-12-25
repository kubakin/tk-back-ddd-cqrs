import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../../common/base/base.entity';

@Entity()
export class AdminEntity extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column()
  password: string;
  @Column()
  phone: string;
}
