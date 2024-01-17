import { Module } from "@nestjs/common";
import { PositionService } from "./position.service";
import { CacheModule } from '@nestjs/cache-manager';
@Module({
    providers: [PositionService],
    imports: [CacheModule.register()],
    exports: [PositionService]
})
export class PositionModule {}