import { Openid } from '@/decorator/openid.decorator';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { Album } from './entities/album.entity';

@ApiTags('album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  /**
   * 创建相册
   */
  @Post('/create')
  @ApiOkResponse({ status: 200, type: Album })
  async create(@Openid() openid: string, @Body() body: CreateAlbumDto) {
    return await this.albumService.create(openid, body);
  }
  /**
   * 相册列表
   */
  @Get('/list')
  @ApiOkResponse({ status: 200, type: [Album] })
  async findAll(@Openid() openid: string) {
    return await this.albumService.findAll(openid);
  }
  /**
   * 相册详情
   */
  @Get(':id')
  @ApiOkResponse({ status: 200, type: Album })
  async findOne(@Param('id') id: string) {
    return await this.albumService.findOne(+id);
  }
  /**
   * 修改相册信息
   */
  @Post(':id')
  @ApiOkResponse({ status: 200, type: Album })
  async update(@Param('id') id: string, @Body() body: UpdateAlbumDto) {
    return await this.albumService.update(+id, body);
  }
  /**
   * 删除相册
   */
  @Delete(':id')
  @ApiOkResponse({ status: 200, type: Boolean })
  async delete(@Param('id') id: string) {
    return await this.albumService.delete(+id);
  }
}
