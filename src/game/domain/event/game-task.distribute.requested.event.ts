export class GameTaskDistributeRequestedEvent {
  id: string;
  instanceId: string;
  strategy: string;

  constructor(data: GameTaskDistributeRequestedEvent) {
    Object.assign(this, data);
  }
}
