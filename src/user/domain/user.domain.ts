import { BaseDomain } from '../../common/base/base.domain';
import { Logger } from '@nestjs/common';

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

  deleted() {
    this.logger.debug(`User ${this.name}, ${this.phone} deleted`);
  }

  leave() {
    this.teamId = null;
  }
}
