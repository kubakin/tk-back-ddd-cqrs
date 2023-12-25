import { Message } from './message.domain';

export class MessageRepository {
  save: (msg: Message) => Promise<void>;
}
