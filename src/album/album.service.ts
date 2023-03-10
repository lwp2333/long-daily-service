import { PrismaService } from '@/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { Album, AlbumDetail } from './entities/album.entity';
@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userOpenid: string, info: CreateAlbumDto): Promise<number> {
    const res = await this.prisma.album.create({
      data: {
        userOpenid,
        ...info,
      },
    });
    return res.id;
  }
  async findAll(userOpenid: string): Promise<Album[]> {
    const res = await this.prisma.album.findMany({
      where: {
        userOpenid,
      },
      include: {
        _count: {
          select: {
            assets: true,
          },
        },
      },
      orderBy: {
        lastUpdateTime: 'asc',
      },
    });
    return res.map(it => {
      const { _count, ...other } = it;
      return {
        ...other,
        assetCount: _count.assets,
      };
    });
  }
  async findOne(id: number): Promise<AlbumDetail> {
    const res = await this.prisma.album.findUnique({
      where: {
        id,
      },
      include: {
        assets: {
          orderBy: {
            lastUpdateTime: 'asc',
          },
        },
        _count: {
          select: {
            assets: true,
          },
        },
      },
    });

    const { _count, ...other } = res;
    return {
      ...other,
      assetCount: _count.assets,
    } as unknown as AlbumDetail;
  }
  async update(id: number, data: UpdateAlbumDto) {
    return await this.prisma.album.update({
      where: {
        id,
      },
      data,
    });
  }
  async delete(id: number) {
    try {
      await this.prisma.album.delete({
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
