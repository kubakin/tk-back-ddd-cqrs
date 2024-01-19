import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { UserRepository } from '../../../domain/user.repository';
import { SendAttemptCommand } from './send.attempt.command';

@CommandHandler(SendAttemptCommand)
export class SendAttemptHandler
  implements ICommandHandler<SendAttemptCommand, void>
{
  @Inject(InjectionToken.UserRepository)
  private readonly userRepository: UserRepository;

  async execute(command: SendAttemptCommand): Promise<void> {
    const user = await this.userRepository.findById(command.userId);
    user.sendAttempt(command.taskInstanceId, command.answer);
    user.commit();
  }
}
