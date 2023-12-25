export class Team {
  id: string;
  name: string;
}

export class Task {
  id: string;
}

export class Game {
  id: string;
  name: string;
}

export class Attempt {
  id: string;
}

export class TaskInstance {
  id: string;
  order: number;
  status: string;
  task: Task;
  helpStatus: number;
  attempts: Attempt[];
}

export class GameInstanceListItem {
  id: string;
  status: string;
  team: Team;
  score: number;
  game: Game;
  tasks: TaskInstance[];
}

export class GameInstanceListResult {
  data: GameInstanceListItem[];
}
