import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../../common/base/base.entity';

@Entity()
export class MessageEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  text: string;

  @Column()
  teamId: string;

  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: true })
  adminId: string;
}
