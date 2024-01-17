import { IsString, validateSync } from 'class-validator';

export class QrTaskAnswer {
  @IsString()
  value: string;

  static validate(data: unknown) {
    const body = Object.assign(new QrTaskAnswer(), data);
    validateSync(body);
  }
}
