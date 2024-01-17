import { GameInstanceEntity } from '../game-instance.entity';

export class GameInstanceUpdated extends GameInstanceEntity {
  constructor(obj: GameInstanceUpdated) {
    super();
    Object.assign(this, obj);
  }
}
