import {
  GameInstance,
  GameInstanceDomain,
  GameInstanceOptions,
} from './game-instance.domain';
import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

interface CreateGameInstanceOptions {
  id: string;
  gameId: string;
  teamId: string;
}

@Injectable()
export class GameInstanceFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateGameInstanceOptions): GameInstance {
    return this.reconstitute({
      id: options.id,
      teamId: options.teamId,
      gameId: options.gameId,
      status: 'CREATED',
    });
  }

  reconstitute(options: GameInstanceOptions): GameInstance {
    return this.eventPublisher.mergeObjectContext(
      Object.assign(new GameInstanceDomain(), options),
    );
  }
}
