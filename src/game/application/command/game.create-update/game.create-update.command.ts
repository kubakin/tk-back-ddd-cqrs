export class GameCreateUpdateCommand {
  id: string;
  name: string;
  disabled: boolean;
  cost: number;

  constructor(data: GameCreateUpdateCommand) {
    Object.assign(this, data);
  }
}
