import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';

interface PositionInteface {
  longitude: number;
  latitude: number;
  timestamp: number;
}

@Injectable()
export class PositionService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async save(id: string, data: PositionInteface) {
    await this.cacheManager.set(id, data, 999999);
  }

  async get(id: string) {
    return await this.cacheManager.get(id);
  }
}
