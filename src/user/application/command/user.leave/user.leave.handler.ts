import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserLeaveCommand } from './user.leave.command';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { UserRepository } from '../../../domain/user.repository';

@CommandHandler(UserLeaveCommand)
export class UserLeaveHandler
  implements ICommandHandler<UserLeaveCommand, void>
{
  @Inject(InjectionToken.UserRepository)
  private readonly userRepository: UserRepository;

  async execute(command: UserLeaveCommand): Promise<void> {
    const user = await this.userRepository.findById(command.id);
    user.join(command.teamId);
    await this.userRepository.save(user);
  }
}
