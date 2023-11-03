import { Game, GameDomain, GameOptions } from './game.domain';
import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

interface CreateGameOptions {
  id: string;
  name: string;
  disabled: boolean;
  cost: number;
}

@Injectable()
export class GameFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateGameOptions): Game {
    return this.reconstitute({
      id: options.id,
      name: options.name,
      cost: options.cost,
      disabled: options.disabled,
    });
  }

  reconstitute(options: GameOptions): Game {
    return this.eventPublisher.mergeObjectContext(
      Object.assign(new GameDomain(), options),
    );
  }
}
