export class TaskInstanceEntity {
  id: string;
  taskId: string;
  gameInstanceId: string;
  order: number;
  startedAt: Date;
  answeredAt: Date;
  answeredBy: string;
}
