import { Openid } from '@/decorator/openid.decorator';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateLifeInventoryDto, UpdateLifeInventoryDto } from './dto/lifeInventory.dto';
import { LifeInventoryEntity } from './entities/lifeInventory.entity';
import { LifeInventoryService } from './life-inventory.service';

@ApiTags('lifeInventory')
@Controller('life-inventory')
export class LifeInventoryController {
  constructor(private readonly lifeInventoryService: LifeInventoryService) {}

  /**
   * 创建清单
   */
  @Post('/create')
  @ApiOkResponse({ status: 200, type: LifeInventoryEntity })
  create(@Openid() openid: string, @Body() body: CreateLifeInventoryDto) {
    return this.lifeInventoryService.create(openid, body);
  }
  /**
   * 获取全部清单
   */
  @Get('/allList')
  @ApiOkResponse({ status: 200, type: [LifeInventoryEntity] })
  getAllList(@Openid() openid: string) {
    return this.lifeInventoryService.getAllList(openid);
  }
  /**
   * 获取清单详情
   */
  @Get(':id')
  @ApiOkResponse({ status: 200, type: LifeInventoryEntity })
  findOne(@Openid() openid: string, @Param('id') id: string) {
    return this.lifeInventoryService.findOne(openid, +id);
  }
  /**
   * 更新清单
   */
  @Post(':id')
  @ApiOkResponse({ status: 200, type: LifeInventoryEntity })
  update(@Openid() openid: string, @Param('id') id: string, @Body() updatePlogDto: UpdateLifeInventoryDto) {
    return this.lifeInventoryService.update(openid, +id, updatePlogDto);
  }
  /**
   * 删除清单
   */
  @Delete(':id')
  @ApiOkResponse({ status: 200, type: Boolean })
  delete(@Openid() openid: string, @Param('id') id: string) {
    return this.lifeInventoryService.delete(openid, +id);
  }
}
