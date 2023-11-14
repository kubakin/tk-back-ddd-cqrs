import { IsString } from 'class-validator';

export class TeamCreateDto {
  @IsString()
  name: string;
}
