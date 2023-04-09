import { PrismaService } from '@/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/asset.dto';

@Injectable()
export class AssetService {
  constructor(private readonly prisma: PrismaService) {}
  create(userOpenid: string, body: CreateAssetDto) {
    return this.prisma.asset.create({
      data: {
        userOpenid,
        ...body,
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

  async getTypeCount(userOpenid: string) {
    const imageCount = await this.prisma.asset.count({
      where: {
        userOpenid,
        type: 'image',
      },
    });
    const videoCount = await this.prisma.asset.count({
      where: {
        userOpenid,
        type: 'video',
      },
    });
    const audioCount = await this.prisma.asset.count({
      where: {
        userOpenid,
        type: 'audio',
      },
    });

    return {
      imageCount,
      videoCount,
      audioCount,
    };
  }
}
