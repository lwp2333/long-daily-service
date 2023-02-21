import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * 主页
   */
  @Get()
  @Render('index')
  @ApiOkResponse({
    status: 200,
    type: String,
    description: '主页',
  })
  getHello() {
    return {
      message: this.appService.getHello(),
    };
  }
}
