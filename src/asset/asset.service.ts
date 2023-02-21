import { PrismaService } from '@/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/asset.dto';

@Injectable()
export class AssetService {
  constructor(private readonly prisma: PrismaService) {}
  create(info: CreateAssetDto, userOpenid: string) {
    return this.prisma.asset.create({
      data: {
        ...info,
        userOpenid,
      },
    });
  }

  async delete(id: number) {
    try {
      await this.prisma.asset.delete({
        where: {
          id,
        },
      });
      return true;
    } catch (error) {
      console.log(error, 'error');
      return false;
    }
  }
}
