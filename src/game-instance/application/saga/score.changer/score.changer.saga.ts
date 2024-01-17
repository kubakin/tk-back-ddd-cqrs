import { Inject, Injectable, Logger } from '@nestjs/common';
import { CommandBus, ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, map } from 'rxjs';
import { InjectionToken } from '../../injection.token';
import { GameInstanceRepository } from 'src/game-instance/domain/game-instance.repository';
import { ScoreChangeInterface } from './score.changer.interface';
import { TaskOverEvent } from 'src/task-instance/domain/event/task.over.event';
import { FinishInstanceCommand } from '../../command/finish.instance/finish.instance.command';
import { InstanceAttemptApproved } from 'src/task-instance/domain/event/instance.attempt.approved.event';
import { InstanceAttemptRejected } from 'src/task-instance/domain/event/instance.attempt.rejected.event';
import { ChangeScoreCommand } from '../../command/change.score/change.score.command';

@Injectable()
export class ScoreChangerSaga {
  @Inject(InjectionToken.GameInstanceRepository)
  repository: GameInstanceRepository;

  readonly logger = new Logger(ScoreChangerSaga.name);
  @Saga()
  changeScore = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(InstanceAttemptApproved, InstanceAttemptRejected),
      map((event: ScoreChangeInterface) => {
        return new ChangeScoreCommand({
          gameInstanceId: event.gameInstanceId,
          scoreChange: event.scoreChange,
        });
      }),
    );
  };
}
