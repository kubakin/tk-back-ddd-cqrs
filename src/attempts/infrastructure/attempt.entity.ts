import { Column, Entity, PrimaryColumn } from 'typeorm';
import { TaskAnswerType } from '../../task/domain/types/task-answer.type';
import { BaseEntity } from 'src/common/base/base.entity';

// export class AttemptEntity {
//   id: string;
//   taskInstanceId: string;
//   data: TaskAnswerType;
//   teamId: string;
//   createdAt: Date;
//   status: string;
//   userId: string;
// }

@Entity()
export class AttemptEntity extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column()
  taskInstanceId: string;
  @Column('simple-json')
  data: TaskAnswerType;
  @Column()
  teamId: string;
  @Column()
  createdAt: Date;
  @Column()
  status: string;
  @Column()
  userId: string;
}
