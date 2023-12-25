import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { SendAdminMessageCommand } from './send.admin.message.command';
import { AdminRepository } from '../../../domain/admin.repository';

@CommandHandler(SendAdminMessageCommand)
export class SendAdminMessageHandler
  implements ICommandHandler<SendAdminMessageCommand, void>
{
  @Inject(InjectionToken.AdminRepository)
  private readonly repository: AdminRepository;

  async execute(command: SendAdminMessageCommand): Promise<void> {
    const user = await this.repository.findById(command.adminId);
    user.sendMessage(command.text, command.teamId);
    user.commit();
  }
}
