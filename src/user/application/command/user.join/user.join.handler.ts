import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserJoinCommand } from './user.join.command';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { UserRepository } from '../../../domain/user.repository';

@CommandHandler(UserJoinCommand)
export class UserJoinHandler implements ICommandHandler<UserJoinCommand, void> {
  @Inject(InjectionToken.UserRepository)
  private readonly userRepository: UserRepository;

  async execute(command: UserJoinCommand): Promise<void> {
    const user = await this.userRepository.findById(command.id);
    user.join(command.teamId);
    await this.userRepository.save(user);
  }
}
