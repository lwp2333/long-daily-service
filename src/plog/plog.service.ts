import { PrismaService } from '@/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePlogDto, GetListByPageDto } from './dto/plog.dto';
import dayjs from 'dayjs';

@Injectable()
export class PlogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userOpenid: string, body: CreatePlogDto) {
    const { assets, ...other } = body;
    const res = await this.prisma.plog.create({
      data: {
        userOpenid,
        ...other,
        assets: {
          createMany: {
            data: assets.map(it => ({ ...it, userOpenid })),
            skipDuplicates: false,
          },
        },
      },
    });
    return res.id;
  }

  async findByPage(userOpenid: string, body: GetListByPageDto) {
    const { pageIndex, pageSize: take, ...other } = body;
    const skip = take * (pageIndex - 1);
    const res = await this.prisma.plog.findMany({
      where: {
        userOpenid,
        ...other,
      },
      include: {
        assets: {
          orderBy: {
            sort: 'asc',
          },
        },
      },
      skip,
      take,
    });
    return {
      total: 0,
      list: res.map(it => ({
        ...it,
        lastUpdateTime: dayjs(it.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss'),
      })),
    };
  }

  async findOne(userOpenid: string, id: number) {
    return await this.prisma.plog.findUnique({
      where: { id },
      include: {
        assets: true,
      },
    });
  }

  // async update(userOpenid: string, id: number, body: UpdatePlogDto) {
  //   const { assets, ...other } = body;
  //   try {
  //     await this.prisma.plog.update({
  //       where: {
  //         id,
  //       },
  //       data: {
  //         ...other,
  //       },
  //     });
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // }

  async delete(userOpenid: string, id: number) {
    try {
      await this.prisma.plog.delete({
        where: {
          id,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
