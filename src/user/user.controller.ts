import { Openid } from '@/decorator/openid.decorator';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, UpdateUserDto } from './dto/user.dto';
import { LoginEntity, UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  /**
   * 用户登录
   */
  @Get('loginByCode')
  @ApiOkResponse({ status: 200, type: LoginEntity })
  async loginByCode(@Query() params: LoginDto) {
    return await this.userService.loginByCode(params.code);
  }
  /**
   * 小程序校验token过期
   */
  @Get('checkAuth')
  @ApiOkResponse({ status: 200, type: Boolean })
  async checkAuth(@Openid() openid: string) {
    console.log('openid', openid);
    return true;
  }
  /**
   * 获取用户信息
   */
  @Get('userInfo')
  @ApiOkResponse({ status: 200, type: UserEntity })
  async userInfo(@Openid() openid: string) {
    return await this.userService.getUserInfo(openid);
  }
  /**
   * 更新用户信息
   */
  @Post('userInfo')
  @ApiOkResponse({ status: 200, type: Boolean })
  async updateUserInfo(@Openid() openid: string, @Body() body: UpdateUserDto) {
    return await this.userService.updateUserInfo(openid, body);
  }
}
