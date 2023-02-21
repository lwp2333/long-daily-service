import { PrismaService } from '@/services/prisma.service';
import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';

@Module({
  controllers: [AssetController],
  providers: [AssetService, PrismaService],
})
export class AssetModule {}
