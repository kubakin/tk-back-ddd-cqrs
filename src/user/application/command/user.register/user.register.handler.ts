import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRegisterCommand } from './user.register.command';
import { UserFactory } from '../../../domain/user.factory';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { UserRepository } from '../../../domain/user.repository';

@CommandHandler(UserRegisterCommand)
export class UserRegisterHandler
  implements ICommandHandler<UserRegisterCommand, void>
{
  @Inject(InjectionToken.UserRepository)
  private readonly userRepository: UserRepository;

  constructor(private userFactory: UserFactory) {}

  async execute(command: UserRegisterCommand): Promise<void> {
    const user = this.userFactory.create({
      id: command.id,
      phone: command.phone,
    });
    await this.userRepository.save(user);
  }
}
