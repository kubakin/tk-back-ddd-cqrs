import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { UserRepository } from '../../../domain/user.repository';
import { UserDeleteCommand } from './user.delete.command';

@CommandHandler(UserDeleteCommand)
export class UserDeleteHandler
  implements ICommandHandler<UserDeleteCommand, void>
{
  @Inject(InjectionToken.UserRepository)
  private readonly userRepository: UserRepository;

  async execute(command: UserDeleteCommand): Promise<void> {
    const user = await this.userRepository.findById(command.id);
    user.deleted();
    await this.userRepository.delete(user);
    user.commit();
  }
}
