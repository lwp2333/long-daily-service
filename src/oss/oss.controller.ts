import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OssTokenEntity } from './entities/oss.entity';
import { OssService } from './oss.service';

@ApiTags('oss')
@Controller('oss')
export class OssController {
  constructor(private readonly ossService: OssService) {}
  /**
   * 获取oss临时上传凭证
   */
  @Get('/token')
  @ApiOkResponse({ status: 200, type: OssTokenEntity })
  async getOssToken() {
    return await this.ossService.getOssToken();
  }
}
