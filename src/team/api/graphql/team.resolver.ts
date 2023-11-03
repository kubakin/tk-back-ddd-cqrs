import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectionToken } from '../../application/injection.token';
import { Inject } from '@nestjs/common';
import { TeamRepositoryImplements } from '../../infrastructure/team.repository.implements';
import { TeamSchema } from './team.schema';
import { generateString } from '@nestjs/typeorm';

@Resolver((of) => TeamSchema)
export class TeamResolver {
  @Inject(InjectionToken.TeamRepository) query: TeamRepositoryImplements;

  constructor() {}

  //
  // @Query((returns) => [TeamSchema])
  // async userList(): Promise<TeamSchema[]> {
  //   return (await this.query.findAll()) as any;
  // }

  // @Query((returns) => TeamSchema)
  // async team(): Promise<TeamSchema[]> {
  //   const test = (await this.query.findAll()) as any;
  //   return test[0];
  // }

  @ResolveField('test', (returns) => TeamSchema)
  async getTeamName(@Parent() team: TeamSchema) {
    console.log(team);
    return {
      id: 1,
      name: generateString(),
    };
  }
}
