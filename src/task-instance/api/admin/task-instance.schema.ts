import { Field, ObjectType } from '@nestjs/graphql';
import { UserTaskInstance } from '../user/task-instance.schema';
import { AdminTask } from 'src/task/api/admin/task.schema';
import { AdminGameInstance } from 'src/game-instance/api/admin/game-instance.schema';

@ObjectType()
export class AdminTaskInstance extends UserTaskInstance {
  @Field(() => AdminTask)
  task: AdminTask;
  @Field(() => AdminGameInstance)
  gameInstance: AdminGameInstance;
}
