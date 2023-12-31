import { Injectable, Logger } from '@nestjs/common';
import { IsInt, IsString, validateSync } from 'class-validator';
import { Type } from 'class-transformer';

@Injectable()
export class Configuration {
  @IsString()
  readonly DB_HOST = process.env.DB_HOST;
  @IsString()
  readonly DB_NAME = process.env.DB_NAME;
  @IsString()
  readonly DB_PASSWORD = process.env.DB_PASSWORD;
  @IsString()
  readonly DB_USER = process.env.DB_USER;
  @IsInt()
  @Type(() => Number)
  readonly DB_PORT = Number(process.env.DB_PORT);
  @IsInt()
  readonly PORT = Number(process.env.PORT);
  @IsString()
  readonly JWT_SECRET = process.env.JWT_SECRET;
  private readonly logger = new Logger(Configuration.name);

  constructor() {
    const error = validateSync(this);
    if (!error.length) return;
    this.logger.error(`Config validation error: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
