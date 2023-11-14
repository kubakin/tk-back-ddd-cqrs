export class GameUpdateCommand {
  id: string;
  name: string;
  hidden: boolean;
  taskStrategy: string;
  cost: number;
  rulesImgUrl: string;
  logoUrl: string;
  personLimit: number;
  duration: number;
  description: string;

  constructor(data: GameUpdateCommand) {
    Object.assign(this, data);
  }
}
