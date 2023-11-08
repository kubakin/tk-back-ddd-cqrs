export class UserRegisterCommand {
  id: string;
  phone: string;
  name: string;

  constructor(data: UserRegisterCommand) {
    Object.assign(this, data);
  }
}
