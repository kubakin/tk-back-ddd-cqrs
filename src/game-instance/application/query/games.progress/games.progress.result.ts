export class Team {
  id: string;
  name: string;
}

export class Task {
  id: string;
}

export class TaskInstance {
  id: string;
  order: number;
  task: Task;
}

export class GameProgressItem {
  id: string;
  team: Team;
  tasks: TaskInstance[];
}

export class GamesProgressResult {
  data: GameProgressItem[];
}
