import { Openid } from '@/decorator/openid.decorator';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreatePlogDto, GetListByPageDto } from './dto/plog.dto';
import { PlogByPageEntity, PlogEntity } from './entities/plog.entity';
import { PlogService } from './plog.service';

@ApiTags('plog')
@Controller('plog')
export class PlogController {
  constructor(private readonly plogService: PlogService) {}

  /**
   * 创建动态
   */
  @Post('/create')
  @ApiOkResponse({ status: 200, type: Number })
  create(@Openid() openid: string, @Body() body: CreatePlogDto) {
    return this.plogService.create(openid, body);
  }
  /**
   * 分页获取动态列表
   */
  @Post('/getListByPage')
  @ApiOkResponse({ status: 200, type: PlogByPageEntity })
  findByPage(@Openid() openid: string, @Body() body: GetListByPageDto) {
    return this.plogService.findByPage(openid, body);
  }
  /**
   * 获取动态详情
   */
  @Get(':id')
  @ApiOkResponse({ status: 200, type: PlogEntity })
  findOne(@Openid() openid: string, @Param('id') id: string) {
    return this.plogService.findOne(openid, +id);
  }
  // @Post(':id')
  // @ApiOkResponse({ status: 200, type: Boolean })
  // update(@Openid() openid: string, @Param('id') id: string, @Body() updatePlogDto: UpdatePlogDto) {
  //   return this.plogService.update(openid, +id, updatePlogDto);
  // }
  /**
   * 删除动态
   */
  @Delete(':id')
  @ApiOkResponse({ status: 200, type: Boolean })
  delete(@Openid() openid: string, @Param('id') id: string) {
    return this.plogService.delete(openid, +id);
  }
}
