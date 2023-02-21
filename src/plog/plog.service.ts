import { PrismaService } from '@/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePlogDto, GetListByPageDto } from './dto/plog.dto';
import { UpdatePlogDto } from './dto/plog.dto';

@Injectable()
export class PlogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userOpenid: string, body: CreatePlogDto) {
    return await this.prisma.plog.create({
      data: {
        userOpenid,
        ...body,
      },
    });
  }

  async findByPage(userOpenid: string, query: GetListByPageDto) {
    const { pageIndex, pageSize: take, ...other } = query;
    const skip = take * (pageIndex - 1);
    return await this.prisma.plog.findMany({
      where: {
        userOpenid,
        ...other,
      },
      include: {
        assets: true,
      },
      skip,
      take,
    });
  }

  async findOne(userOpenid: string, id: number) {
    return await this.prisma.plog.findUnique({
      where: { id },
      include: {
        assets: true,
      },
    });
  }

  async update(userOpenid: string, id: number, data: UpdatePlogDto) {
    return await this.prisma.plog.update({
      where: {
        id,
      },
      data,
    });
  }

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
