import { PrismaService } from '@/services/prisma.service';
import { Module } from '@nestjs/common';
import { LifeInventoryController } from './life-inventory.controller';
import { LifeInventoryService } from './life-inventory.service';

@Module({
  controllers: [LifeInventoryController],
  providers: [LifeInventoryService, PrismaService],
})
export class LifeInventoryModule {}
