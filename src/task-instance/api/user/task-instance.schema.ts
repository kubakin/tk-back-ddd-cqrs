import { Field, ObjectType } from '@nestjs/graphql';
import { UserGameInstance } from 'src/game-instance/api/user/game-instance.schema';
import { UserTask } from 'src/task/api/user/task.schema';

@ObjectType()
export class UserTaskInstance {
  @Field()
  id: string;
  @Field()
  taskId: string;
  @Field()
  gameInstanceId: string;
  @Field()
  order: number;
  @Field({ nullable: true })
  startedAt: Date;
  @Field({ nullable: true })
  answeredAt: Date;
  @Field({ nullable: true })
  answeredBy: string;
  @Field()
  status: string;
  @Field()
  helpStatus: number;
  @Field(()=>UserTask)
  task: UserTask;
  @Field(()=>UserGameInstance)
  gameInstance: UserGameInstance;
}
