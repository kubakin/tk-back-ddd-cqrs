import { Game, GameDomain, GameOptions } from './game.domain';
import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

interface CreateGameOptions {
  id: string;
  name: string;
  hidden?: boolean;
  taskStrategy: string;
  cost?: number;
  rulesImgUrl: string;
  logoUrl: string;
  personLimit: number;
  duration: number;
  description?: string;
}

@Injectable()
export class GameFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateGameOptions): Game {
    return this.reconstitute({
      id: options.id,
      name: options.name,
      cost: options.cost,
      hidden: !!options.hidden,
      duration: options.duration,
      rulesImgUrl: options.rulesImgUrl,
      description: options.description,
      personLimit: options.personLimit,
      taskStrategy: options.taskStrategy,
    });
  }

  reconstitute(options: GameOptions): Game {
    return this.eventPublisher.mergeObjectContext(
      Object.assign(new GameDomain(), options),
    );
  }
}
