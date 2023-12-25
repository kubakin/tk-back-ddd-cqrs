export class Game {
  id: string;
  name: string;
}

export class TeamGameInstanceListItem {
  id: string;
  status: string;
  game: Game;
}

export class TeamInstancesListResult {
  data: TeamGameInstanceListItem[];
}
