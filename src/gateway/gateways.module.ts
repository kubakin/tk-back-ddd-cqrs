import { Module } from '@nestjs/common';
import { AdminGateway } from './admin.gateway';
import { MessageCreatedHandler } from './application/event/message.created';

@Module({
  imports: [],
  controllers: [],
  providers: [AdminGateway, MessageCreatedHandler],
})
export class GatewaysModule {}
