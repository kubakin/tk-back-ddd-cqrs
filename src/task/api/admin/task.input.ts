import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { UserTask } from '../user/task.schema';
import { AdminGame } from 'src/game/api/admin/game.schema';

@InputType()
class TaskInput {
  @Field()
  gameId: string;
}

@InputType()
export class TaskInputDto extends PartialType(TaskInput) {}
