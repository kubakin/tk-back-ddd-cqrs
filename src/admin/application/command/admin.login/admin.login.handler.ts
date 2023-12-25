import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { AdminLoginCommand } from './admin.login.command';
import { AdminRepository } from '../../../domain/admin.repository';

@CommandHandler(AdminLoginCommand)
export class AdminLoginHandler
  implements ICommandHandler<AdminLoginCommand, void>
{
  @Inject(InjectionToken.AdminRepository)
  private readonly userRepository: AdminRepository;

  async execute(command: AdminLoginCommand): Promise<void> {}
}
