export class TeamUser {
  id: string;
  phone: string;
  name: string | null;
}

export class TeamListItem {
  id: string;
  name: string;
  users: TeamUser[];
}

export class TeamListResult {
  data: TeamListItem[];
}
