export class GameCreateCommand {
  id: string;
  name: string;
  description: string;
  hidden: boolean;
  cost: number;
  rules: string;
  finalText: string;
  personLimit: number;
  duration: number;
  taskStrategy: string;
  autoStart: boolean;
  autoEnd: boolean;
  plannedAt: Date;
  

  constructor(data: GameCreateCommand) {
    Object.assign(this, data);
  }
}
