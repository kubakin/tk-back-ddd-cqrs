import { PartialType } from '@nestjs/swagger';
import { ETaskType } from 'src/task/domain/enum/task.types';

export class TaskUpdateCommand {
  id: string;
  description?: string;
  name?: string;
  defaultOrder?: number;
  type?: ETaskType;
  answer?: any;
  gameId?: string;
  body?: any;
  cost?: number;
  penalty?: number;

  constructor(data: TaskUpdateCommand) {
    Object.assign(this, data);
  }
}
