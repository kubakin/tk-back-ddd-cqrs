import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { pubSub } from '../../../app.module';
import { AttemptFailed } from 'src/attempts/domain/event/attempt.failed';
import { NotificationSchema } from '../notification.schema';
import { RepoProvider } from 'src/common/repo.provider';

@EventsHandler(AttemptFailed)
export class AttemptFailedNotify implements IEventHandler<AttemptFailed> {
  constructor(private repoProvider: RepoProvider) {}
  async handle(event: AttemptFailed) {
    const users = await this.repoProvider.userRepository.find({
      where: { teamId: event.teamId },
    });
    await Promise.all(
      users.map(async (user) => {
        const payload: NotificationSchema = {
          text: 'Неправильный ответ',
          type: 'error',
          userId: user.id,
        };
        await pubSub.publish('notifyUser', { notifyUser: payload });
      }),
    );
  }
}
