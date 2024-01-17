import { Inject, Injectable, Logger } from '@nestjs/common';
import { CommandBus, ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, map } from 'rxjs';
import { InjectionToken } from '../../injection.token';
import { GameInstanceRepository } from 'src/game-instance/domain/game-instance.repository';
import { GameFinishInterface } from './game.finisher.interface';
import { TaskOverEvent } from 'src/task-instance/domain/event/task.over.event';
import { FinishInstanceCommand } from '../../command/finish.instance/finish.instance.command';

@Injectable()
export class GameFinisherSaga {
  @Inject(InjectionToken.GameInstanceRepository)
  repository: GameInstanceRepository;

  constructor(private commandBus: CommandBus) {}

  readonly logger = new Logger(GameFinisherSaga.name);
  @Saga()
  gameFinisher = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(TaskOverEvent),
      map((event: GameFinishInterface) => {
        return new FinishInstanceCommand({
          gameInstanceId: event.gameInstanceId,
        });
      }),
    );
  };
}
