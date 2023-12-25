import { writeConnection } from '../../../lib/db.module';
import { Injectable } from '@nestjs/common';
import { MessageRepository } from '../domain/message.repository';
import { MessageFactory } from '../domain/message.factory';
import { Message } from '../domain/message.domain';
import { MessageEntity } from './message.entity';

@Injectable()
export class MessageRepositoryImplements implements MessageRepository {
  constructor(private factory: MessageFactory) {}

  async save(msg: Message) {
    const models = [msg];
    const entities = models.map((model) => this.modelToEntity(model));
    await this.repository.save(entities);
  }

  private entityToModel(data: MessageEntity): Message {
    return this.factory.reconstitute(data);
  }

  private modelToEntity(data: any): MessageEntity {
    return { ...data };
  }

  get repository() {
    return writeConnection.manager.getRepository(MessageEntity);
  }
}
