import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordService {
  async hash(password: string) {
    return await bcrypt.hash(password, 13);
  }

  async validate(password: string, passwordHash: string) {
    return await bcrypt.compare(password, passwordHash);
  }
}
