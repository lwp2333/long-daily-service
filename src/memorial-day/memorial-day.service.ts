import { PrismaService } from '@/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateMemorialDayDto, UpdateMemorialDayDto } from './dto/memorialDay.dto';

@Injectable()
export class MemorialDayService {
  constructor(private readonly prisma: PrismaService) {}
  create(userOpenid: string, info: CreateMemorialDayDto) {
    return this.prisma.memorialday.create({
      data: {
        ...info,
        date: new Date(info.date),
        userOpenid,
      },
    });
  }

  update(userOpenid: string, id: number, info: UpdateMemorialDayDto) {
    return this.prisma.memorialday.update({
      where: {
        id,
      },
      data: {
        ...info,
        date: new Date(info.date),
        userOpenid,
      },
    });
  }

  findOne(userOpenid: string, id: number) {
    return this.prisma.memorialday.findUnique({
      where: {
        id,
      },
    });
  }

  getAllList(userOpenid: string) {
    return this.prisma.memorialday.findMany({
      where: {
        userOpenid,
      },
    });
  }

  async delete(userOpenid: string, id: number) {
    try {
      await this.prisma.memorialday.delete({
        where: {
          id,
        },
      });
      return true;
    } catch (error) {
      console.log(error, 'error');
      return {
        data: false,
        message: '删除失败，该条记录不存在！',
      };
    }
  }
}
