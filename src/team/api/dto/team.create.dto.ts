import { IsString } from 'class-validator';
import { Reflector } from '@nestjs/core';

export const TestDecorator = Reflector.createDecorator<string[]>();

export const MyDecorator = (value) =>
  // в качестве ключа удобно использовать саму эту функцию
  Reflect.metadata(MyDecorator, value);

export class TeamCreateDto {
  @IsString()
  @MyDecorator('value')
  // @TestDecorator('value')
  name: string;
}
