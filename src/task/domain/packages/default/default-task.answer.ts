import { IsString, validateSync } from 'class-validator';

export class DefaultTaskAnswer {
  @IsString()
  value: string;

  static validate(data: unknown) {
    const body = Object.assign(new DefaultTaskAnswer(), data);
    validateSync(body);
    return body;
  }
}
