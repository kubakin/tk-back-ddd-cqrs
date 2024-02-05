import { IsNumber, IsString, validateSync } from 'class-validator';

class GeoAnswer {
  @IsNumber()
  longitude: number;
  @IsNumber()
  latitude: number;
}

export class GeoTaskAnswer {
  @IsNumber()
  longitude: number;
  @IsNumber()
  latitude: number;

  static validate(data: unknown) {
    const body = Object.assign(new GeoTaskAnswer(), data);
    validateSync(body);
    return body;
  }
}
