import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UserCreateDto } from '../user/api/dto/user.create.dto';
import { UserLoginDto } from '../user/api/dto/user.login.dto';

@Injectable()
export class RegisterLogin {
  readonly logger = new Logger('TEST');

  constructor(private httpService: HttpService) {}

  async main() {
    await this.register({
      name: 'test',
      phone: 'test',
    });
    const login = await this.login({
      phone: 'test',
    });
    return login;
  }

  async register(dto: UserCreateDto): Promise<void> {
    const rs = await this.httpService
      .post(`${process.env.BACK_URL}/user/register`, dto)
      .toPromise();
    this.logger.verbose('register - ok');
  }

  async login(dto: UserLoginDto): Promise<{ accessToken: string }> {
    const rs = await this.httpService
      .post(`${process.env.BACK_URL}/user/login`, dto)
      .toPromise();
    this.logger.verbose('login ok');
    return rs.data;
  }
}
