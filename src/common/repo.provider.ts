import { readConnection } from '../../lib/db.module';
import { UserEntity } from '../user/infrastructure/user.entity';
import { TeamEntity } from '../team/infrastructure/team.entity';
import { Injectable } from '@nestjs/common';
import { GameEntity } from '../game/infrastructure/game.entity';
import { TaskEntity } from '../task/infrastructure/task.entity';
import { TaskInstanceEntity } from '../task-instance/infrastructure/task-instance.entity';
import { GameInstanceEntity } from '../game-instance/infrastructure/game-instance.entity';
import { MessageEntity } from 'src/chat/infrastructure/message.entity';

@Injectable()
export class RepoProvider {
  get userRepository() {
    return readConnection.getRepository(UserEntity);
  }

  get messageRepository() {
    return readConnection.getRepository(MessageEntity);
  }

  get teamRepository() {
    return readConnection.getRepository(TeamEntity);
  }

  get gameRepository() {
    return readConnection.getRepository(GameEntity);
  }

  get gameInstanceRepository() {
    return readConnection.getRepository(GameInstanceEntity);
  }

  get taskRepository() {
    return readConnection.getRepository(TaskEntity);
  }

  get taskInstanceRepository() {
    return readConnection.getRepository(TaskInstanceEntity);
  }
}
