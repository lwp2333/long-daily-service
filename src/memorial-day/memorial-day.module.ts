import { PrismaService } from '@/services/prisma.service';
import { Module } from '@nestjs/common';
import { MemorialDayController } from './memorial-day.controller';
import { MemorialDayService } from './memorial-day.service';

@Module({
  controllers: [MemorialDayController],
  providers: [MemorialDayService, PrismaService],
})
export class MemorialDayModule {}
