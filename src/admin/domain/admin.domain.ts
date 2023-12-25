import { BaseDomain } from '../../common/base/base.domain';
import { Logger } from '@nestjs/common';
import { SendAdminMessageRequested } from './event/send.message.requested';
import { generateString } from '@nestjs/typeorm';

export type AdminRequiredOptions = {
  id: string;
  password: string;
  phone: string;
};

export type AdminOptionalOptions = {
  createdAt: Date;
  updatedAt: Date;
};

export type AdminOptions = Required<AdminRequiredOptions> &
  Partial<AdminOptionalOptions>;

export interface Admin {
  created: () => void;
  commit: () => void;
  sendMessage: (text: string, teamId: string) => void;
}

export class AdminDomain extends BaseDomain implements Admin {
  id: string;
  password: string;
  phone: string;
  readonly logger = new Logger();

  created() {
    // this.logger.debug(`User ${this.name}, ${this.phone} created`);
  }

  sendMessage(text: string, teamId: string) {
    this.apply(
      new SendAdminMessageRequested({
        text,
        id: generateString(),
        teamId: teamId,
        adminId: this.id,
      }),
    );
  }
}
