export class GameCreateCommand {
  id: string;
  name: string;
  hidden: boolean;
  taskStrategy: string;
  cost: number;
  rulesImgUrl: string;
  logoUrl: string;
  personLimit: number;
  duration: number;
  description?: string;

  constructor(data: GameCreateCommand) {
    Object.assign(this, data);
  }
}
