import { Module } from '@nestjs/common';
import { PlogService } from './plog.service';
import { PlogController } from './plog.controller';
import { PrismaService } from '@/services/prisma.service';

@Module({
  controllers: [PlogController],
  providers: [PlogService, PrismaService],
})
export class PlogModule {}
