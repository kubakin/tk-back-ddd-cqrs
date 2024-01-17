export class GameUpdateCommand {
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

  constructor(data: GameUpdateCommand) {
    Object.assign(this, data);
  }
}
