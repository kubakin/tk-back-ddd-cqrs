import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { TeamCreateDto } from '../team/api/dto/team.create.dto';

@Injectable()
export class TeamTest {
  readonly logger = new Logger('TEST');
  token: string;

  constructor(private httpService: HttpService) {}

  async main(token: string) {
    this.token = token;
    const id = await this.create({ name: 'test123' });
    await this.join(id);
    await this.leave();
  }

  async create(dto: TeamCreateDto): Promise<string> {
    const rs = await this.httpService
      .post(`${process.env.BACK_URL}/team`, dto, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .toPromise();
    this.logger.verbose('create team - ok');
    return rs.data;
  }

  async join(teamId: string): Promise<void> {
    const rs = await this.httpService
      .post(`${process.env.BACK_URL}/user/join/${teamId}`, null, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .toPromise();
    this.logger.verbose('join to team - ok ');
  }

  async leave(): Promise<void> {
    const rs = await this.httpService
      .post(`${process.env.BACK_URL}/user/leave`, null, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .toPromise();
    this.logger.verbose('leave from team - ok ');
  }
}
