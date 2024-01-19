import { BaseDomain } from '../../common/base/base.domain';
import { Logger } from '@nestjs/common';
import { SendAttemptRequestedEvent } from '../../team/domain/event/send.attempt.requested.event';
import { SendUserMessageRequested } from './event/send.message.requested';
import { generateString } from '@nestjs/typeorm';

export type UserRequiredOptions = {
  id: string;
  phone: string;
};

export type UserOptionalOptions = {
  teamId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserOptions = Required<UserRequiredOptions> &
  Partial<UserOptionalOptions>;

export interface User {
  join: (teamId: string) => void;
  leave: () => void;
  created: () => void;
  deleted: () => void;
  commit: () => void;
  sendMessage: (text: string) => void;
  sendAttempt: (taskInstanceId: string, answer: unknown) => void;
}

export class UserDomain extends BaseDomain implements User {
  id: string;
  phone: string;
  teamId: string;
  name: string;
  readonly logger = new Logger();

  join(teamId: string) {
    this.teamId = teamId;
  }

  created() {
    this.logger.debug(`User ${this.name}, ${this.phone} created`);
  }

  sendMessage(text: string) {
    this.apply(
      new SendUserMessageRequested({
        text,
        id: generateString(),
        teamId: this.teamId,
        userId: this.id,
      }),
    );
  }

  sendAttempt(taskInstanceId: string, answer: unknown) {
    this.logger.log(`${this.phone} sended ${JSON.stringify(answer)}`)
    this.apply(
      new SendAttemptRequestedEvent({
        teamId: this.teamId,
        userId: this.id,
        answer: answer,
        taskInstanceId,
      }),
    );
  }

  deleted() {
    this.logger.debug(`User ${this.name}, ${this.phone} deleted`);
  }

  leave() {
    this.teamId = null;
  }
}
