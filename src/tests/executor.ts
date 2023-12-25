import { Injectable, Type } from '@nestjs/common';
import { RegisterLogin } from './register-login';
import { TeamTest } from './team-test';
import 'reflect-metadata';

function Reference(metadata: string) {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata(Reference, propertyKey, target, metadata);
  };
}

class UserCreateDto {
  @Reference('user')
  userId: string;
}

const validate = (body, type) => {
  const resolveUserReference = () => {
    const metadata = Reflect.getMetadata(Reference, type.prototype, 'user');
    if (!metadata) {
      return;
    }
    //resolve request
  };
};

class ReferencesClass {
  @Reference('user')
  userId: string;

  @Reference('game')
  gameId: string;
}

@Injectable()
export class Executor {
  constructor(
    private registerLogin: RegisterLogin,
    private teamTest: TeamTest,
  ) {}

  validate<T>(dto: T, type: Type<T>) {}

  async onApplicationBootstrap() {}
}
