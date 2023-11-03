import { AggregateRoot } from '@nestjs/cqrs';

export type UserRequiredOptions = {
  id: string;
  phone: string;
};

export type UserOptionalOptions = {
  teamId: string;
};

export type UserOptions = Required<UserRequiredOptions> &
  Partial<UserOptionalOptions>;

export interface User {
  join: (teamId: string) => void;
  leave: () => void;
}

export class UserDomain extends AggregateRoot implements User {
  id: string;
  phone: string;
  teamId: string;

  join(teamId: string) {
    this.teamId = teamId;
  }

  leave() {
    this.teamId = null;
  }
}
