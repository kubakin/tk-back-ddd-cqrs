import { IsString } from 'class-validator';

export class UserCreateDto {
  @IsString()
  name: string;
  @IsString()
  phone: string;
}
