import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../../common/base/base.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column()
  phone: string;
  @Column({ nullable: true })
  name: string;
}
