import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '../dto/user.dto';

export class UserEntity {
  /**
   * 微信用户唯一标识
   */
  openid: string;
  /**
   * 用户昵称
   */
  nickName: string;
  /**
   * 用户头像
   */
  avatar: string;
  /**
   * 性别
   */
  @ApiProperty({ enum: GenderEnum, enumName: 'GenderEnum' })
  gender: GenderEnum;
  /**
   * 生日
   */
  birthday: string;
  /**
   * 签名
   */
  signature: string;
}
export class LoginEntity extends UserEntity {
  /**
   * token
   */
  token: string;
}
