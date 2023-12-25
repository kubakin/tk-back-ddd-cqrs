export class UserTeam {
  id: string;
  name: string;
}

export class MeResult {
  id: string;
  phone: string;
  team: UserTeam | null;
}
