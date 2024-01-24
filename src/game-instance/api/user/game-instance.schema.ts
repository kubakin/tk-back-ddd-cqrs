import { Field, ObjectType } from '@nestjs/graphql';
import { UserTeam } from '../../../team/api/user/team.schema';
import { UserGame } from '../../../game/api/user/game.schema';
import { UserTaskInstance } from 'src/task-instance/api/user/task-instance.schema';

@ObjectType()
export class UserGameInstance {
  @Field()
  id: string;
  @Field()
  teamId: string;
  @Field()
  status: string;
  @Field({ nullable: true })
  totalTasks: number;
  @Field({ nullable: true })
  progressTasks: number;
  @Field()
  createdAt: Date;
  @Field()
  score: number;
  @Field()
  gameId: string;
  @Field(() => UserGame, { nullable: true })
  game: UserGame;
  @Field(() => UserTeam, { nullable: true })
  team: UserTeam;
  @Field(() => UserTaskInstance, { nullable: true })
  currentTask: UserTaskInstance;
  @Field({ nullable: true })
  currentTaskId: string;
  @Field({ nullable: true })
  endAt: Date;
  @Field({ nullable: true })
  startedAt: Date;
}
