import { Openid } from '@/decorator/openid.decorator';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateMemorialDayDto, UpdateMemorialDayDto } from './dto/memorialDay.dto';
import { MemorialDayEntity } from './entities/memorialDay.entity';
import { MemorialDayService } from './memorial-day.service';

@ApiTags('memorialDay')
@Controller('memorial-day')
export class MemorialDayController {
  constructor(private readonly memorialDayService: MemorialDayService) {}

  /**
   * 创建纪念日
   */
  @Post('/create')
  @ApiOkResponse({ status: 200, type: MemorialDayEntity })
  create(@Openid() openid: string, @Body() body: CreateMemorialDayDto) {
    return this.memorialDayService.create(openid, body);
  }
  /**
   * 获取全部纪念日
   */
  @Get('/allList')
  @ApiOkResponse({ status: 200, type: [MemorialDayEntity] })
  getAllList(@Openid() openid: string) {
    return this.memorialDayService.getAllList(openid);
  }
  /**
   * 获取纪念日详情
   */
  @Get(':id')
  @ApiOkResponse({ status: 200, type: MemorialDayEntity })
  findOne(@Openid() openid: string, @Param('id') id: string) {
    return this.memorialDayService.findOne(openid, +id);
  }
  /**
   * 更新纪念日
   */
  @Post(':id')
  @ApiOkResponse({ status: 200, type: MemorialDayEntity })
  update(@Openid() openid: string, @Param('id') id: string, @Body() updatePlogDto: UpdateMemorialDayDto) {
    return this.memorialDayService.update(openid, +id, updatePlogDto);
  }
  /**
   * 删除纪念日
   */
  @Delete(':id')
  @ApiOkResponse({ status: 200, type: Boolean })
  delete(@Openid() openid: string, @Param('id') id: string) {
    return this.memorialDayService.delete(openid, +id);
  }
}
