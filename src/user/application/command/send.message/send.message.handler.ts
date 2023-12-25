import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { UserRepository } from '../../../domain/user.repository';
import { SendMessageCommand } from './send.message.command';

@CommandHandler(SendMessageCommand)
export class SendMessageHandler
  implements ICommandHandler<SendMessageCommand, void>
{
  @Inject(InjectionToken.UserRepository)
  private readonly userRepository: UserRepository;

  async execute(command: SendMessageCommand): Promise<void> {
    const user = await this.userRepository.findById(command.userId);
    user.sendMessage(command.text);
    user.commit();
  }
}
