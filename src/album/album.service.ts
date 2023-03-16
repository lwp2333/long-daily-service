import { PrismaService } from '@/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { AlbumEntity, AlbumDetailEntity } from './entities/album.entity';
import dayjs from 'dayjs';
import { AssetEntity } from '@/asset/entities/asset.entity';

interface DateMap {
  [k: string]: AssetEntity[];
}
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
  async findAll(userOpenid: string): Promise<AlbumEntity[]> {
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
  async findOne(id: number): Promise<AlbumDetailEntity> {
    const res = await this.prisma.album.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            assets: true,
          },
        },
      },
    });
    const imagesCount = await this.prisma.asset.count({ where: { albumId: id, type: 'image' } });
    const videosCount = await this.prisma.asset.count({ where: { albumId: id, type: 'video' } });
    // 按时间分组
    const allAssets = await this.prisma.asset.findMany({
      where: {
        albumId: id,
      },
      orderBy: {
        lastUpdateTime: 'asc',
      },
    });
    const dateMap: DateMap = allAssets
      .map(it => ({ ...it, date: dayjs(it.lastUpdateTime).format('YYYY-MM-DD') }))
      .reduce((pre, cur) => {
        if (!pre[cur.date]) {
          pre[cur.date] = [];
        }
        pre[cur.date].push(cur);
        return pre;
      }, {});
    const groupList = Object.keys(dateMap).map(date => {
      return {
        date,
        list: dateMap[date],
      };
    });

    const { _count, ...other } = res;
    return {
      ...other,
      assetCount: _count.assets,
      imagesCount,
      videosCount,
      groupList,
    };
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
