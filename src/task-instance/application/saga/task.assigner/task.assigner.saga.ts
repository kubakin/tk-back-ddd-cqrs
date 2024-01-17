import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  EventBus,
  EventsHandler,
  ICommand,
  IEvent,
  Saga,
  ofType,
} from '@nestjs/cqrs';
import { Observable, map, filter } from 'rxjs';
import { GameInstanceCreated } from 'src/game-instance/domain/event/game-instance.created.event';
import { GameInstanceStartedEvent } from 'src/game-instance/domain/event/game-instance.started.event';
import { TaskInstanceRepository } from 'src/task-instance/domain/task-instance.repository';
import { InjectionToken } from '../../injection.token';
import { TaskOverEvent } from 'src/task-instance/domain/event/task.over.event';
import { InstanceAttemptApproved } from 'src/task-instance/domain/event/instance.attempt.approved.event';
import { TaskAssignerInterface } from './task.assigner.interface';
import { TaskAssignCommand } from '../../command/task.assign/task.assign.commad';
import { InstanceVoided } from 'src/task-instance/domain/event/instance.voided.event';

@Injectable()
export class TaskAssignerSaga {
  constructor(private eventBus: EventBus) {}

  readonly logger = new Logger(TaskAssignerSaga.name);

  @Inject(InjectionToken.TaskInstanceRepository)
  taskInstanceRepository: TaskInstanceRepository;

  @Saga()
  taskAssigner = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType<Observable<TaskAssignerInterface>, IEvent>(
        InstanceAttemptApproved,
        GameInstanceStartedEvent,
        InstanceVoided,
      ),
      filter((it: TaskAssignerInterface) => {
        return !it.ignoreAssign;
      }),
      map((event: TaskAssignerInterface) => {
        return new TaskAssignCommand({
          gameInstanceId: event.gameInstanceId,
        });
      }),
    );
  };
}
