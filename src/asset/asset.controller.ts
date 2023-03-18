import { Openid } from '@/decorator/openid.decorator';
import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/asset.dto';
import { AssetEntity } from './entities/asset.entity';

@ApiTags('asset')
@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}
  /**
   * 新增资源
   */
  @Post()
  @ApiOkResponse({ status: 200, type: AssetEntity })
  create(@Openid() openid: string, @Body() body: CreateAssetDto) {
    return this.assetService.create(openid, body);
  }
  /**
   * 删除资源
   */
  @Delete(':id')
  @ApiOkResponse({ status: 200, type: Boolean })
  delete(@Param('id') id: string) {
    return this.assetService.delete(+id);
  }
}
