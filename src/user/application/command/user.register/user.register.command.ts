export class UserRegisterCommand {
  id: string;
  phone: string;

  constructor(data: UserRegisterCommand) {
    Object.assign(this, data);
  }
}
