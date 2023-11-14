export class UserTeam {
  id: string;
  name: string;
}

export class UserListItem {
  id: string;
  phone: string;
  team: UserTeam | null;
}

export class UserListResult {
  data: UserListItem[];
}
