import { BaseDomain } from '../../common/base/base.domain';
import { MessageCreated } from './events/message.created';

export type MessageRequiredOptions = {
  id: string;

  text: string;

  teamId: string;

  userId: string;

  adminId: string;
};

export type MessageOptionalOptions = {
  createdAt: Date;
  updatedAt: Date;
};

export type MessageOptions = Required<MessageRequiredOptions> &
  Partial<MessageOptionalOptions>;

export interface Message {
  commit: () => void;
  created: () => void;
}

export class MessageDomain extends BaseDomain implements Message {
  id: string;

  text: string;

  teamId: string;

  userId: string;

  adminId: string;

  created() {
    this.apply(
      new MessageCreated({
        id: this.id,
        text: this.text,
        teamId: this.teamId,
        adminId: this.adminId,
        userId: this.userId,
      }),
    );
  }
}
