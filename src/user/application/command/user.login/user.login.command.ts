export class UserLoginCommand {
  phone: string;

  constructor(data: UserLoginCommand) {
    Object.assign(this, data);
  }
}
