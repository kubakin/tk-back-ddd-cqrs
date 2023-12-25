import { IsString } from 'class-validator';

export class AdminLoginDto {
  @IsString()
  password: string;
  @IsString()
  phone: string;
}
