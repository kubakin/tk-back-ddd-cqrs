import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserLoginCommand } from './user.login.command';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { UserRepository } from '../../../domain/user.repository';

@CommandHandler(UserLoginCommand)
export class UserLoginHandler
  implements ICommandHandler<UserLoginCommand, void>
{
  @Inject(InjectionToken.UserRepository)
  private readonly userRepository: UserRepository;

  async execute(command: UserLoginCommand): Promise<void> {}
}
