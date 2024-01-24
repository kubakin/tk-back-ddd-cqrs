import { Game, GameDomain, GameOptions } from './game.domain';
import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

interface CreateGameOptions {
  id: string;
  name: string;
  description: string;
  hidden: boolean;
  cost: number;
  rules: string;
  personLimit: number;
  duration: number;
  taskStrategy: string;
  autoStart: boolean;
  autoEnd: boolean;
  plannedAt: Date;
  finalText: string
}

@Injectable()
export class GameFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateGameOptions): Game {
    return this.reconstitute(options);
  }

  reconstitute(options: GameOptions): Game {
    return this.eventPublisher.mergeObjectContext(
      Object.assign(new GameDomain(), options),
    );
  }
}
