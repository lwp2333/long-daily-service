import { PrismaService } from '@/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateLifeInventoryDto, UpdateLifeInventoryDto } from './dto/lifeInventory.dto';

@Injectable()
export class LifeInventoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(userOpenid: string, body: CreateLifeInventoryDto) {
    return this.prisma.lifeinventory.create({
      data: {
        ...body,
        userOpenid,
      },
    });
  }

  update(userOpenid: string, id: number, info: UpdateLifeInventoryDto) {
    return this.prisma.lifeinventory.update({
      where: {
        id,
      },
      data: {
        ...info,
        userOpenid,
      },
    });
  }

  findOne(userOpenid: string, id: number) {
    return this.prisma.lifeinventory.findUnique({
      where: {
        id,
      },
    });
  }

  getAllList(userOpenid: string) {
    return this.prisma.lifeinventory.findMany({
      where: {
        userOpenid,
      },
    });
  }

  async delete(userOpenid: string, id: number) {
    try {
      await this.prisma.lifeinventory.delete({
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
