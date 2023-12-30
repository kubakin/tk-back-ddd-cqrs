import { Field, ObjectType } from '@nestjs/graphql';
import { UserGame } from '../user/game.schema';
import { AdminTask } from 'src/task/api/admin/task.schema';

@ObjectType()
export class AdminGame extends UserGame {
  @Field(() => [AdminTask])
  tasks: AdminTask[];
}
