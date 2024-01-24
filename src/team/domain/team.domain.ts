import { TeamJoinRequestedEvent } from "./event/team.join.requested.event";
import { generateString } from "@nestjs/typeorm";
import { HasId } from "../../common/interfaces/has-id.interface";
import { SendAttemptRequestedEvent } from "./event/send.attempt.requested.event";
import { Logger } from "@nestjs/common";
import { TeamDeletedEvent } from "./event/team.deleted.event";
import { BaseDomain } from "../../common/base/base.domain";
import { TeamCreatedEvent } from "./event/team.created.event";
import { CreateSessionRequested } from "./event/create.session.requested";

export type TeamRequiredOptions = {
  id: string;
  name: string;
  createdBy: string;
};

export type TeamOptionalOptions = {
  createdAt: Date;
  updatedAt: Date;
  currentSessionId: string;
};

export type TeamOptions = Required<TeamRequiredOptions> &
  Partial<TeamOptionalOptions>;

export interface Team extends HasId {
  joinGame: (gameId: string) => void;
  created: () => void;
  deleted: () => void;
  commit: () => void;
  changeCurrentSession: (instanceId?: string) => void;
  createSessionRequest: (id: string, gameId: string) => void;
}

export class TeamDomain extends BaseDomain implements Team {
  id: string;
  name: string;
  currentSessionId: string;
  createdBy: string;

  created() {
    this.logger.debug("Created");
    this.apply(new TeamCreatedEvent({
      name: this.name,
      id: this.id,
      createdBy: this.createdBy
    }));
  }

  deleted() {
    this.logger.debug("Deleted");
    this.apply(new TeamDeletedEvent({ id: this.id }));
  }

  sendAttempt(taskInstanceId: string, answer: string, userId: string) {
    this.apply(
      new SendAttemptRequestedEvent({
        teamId: this.id,
        userId,
        answer: answer,
        taskInstanceId
      })
    );
  }

  joinGame(gameId: string) {
    this.apply(
      new TeamJoinRequestedEvent({
        id: generateString(),
        teamId: this.id,
        gameId
      })
    );
  }

  changeCurrentSession(instanceId?: string) {
    this.currentSessionId = instanceId;
  }

  createSessionRequest(id: string, gameId: string) {
    this.apply(new CreateSessionRequested({ teamId: this.id, gameId, id: generateString() }))
  }

  get logger() {
    return new Logger(`Team ${this.name}`);
  }
}
