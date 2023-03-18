import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsDateString, IsEnum, IsUrl } from 'class-validator';

export enum GenderEnum {
  unknown = 'unknown',
  female = 'female',
  male = 'male',
}

export class LoginDto {
  /**
   * code
   */
  @IsNotEmpty({ message: 'code不能为空' })
  code: string;
}

export class UpdateUserDto {
  /**
   * 用户名
   */
  @IsOptional()
  nickName?: string;
  /**
   * 头像
   */
  @IsOptional()
  avatar?: string;
  /**
   * 性别
   */
  @IsOptional()
  @IsEnum(GenderEnum)
  @ApiProperty({ enum: GenderEnum, enumName: 'GenderEnum' })
  gender?: GenderEnum;
  /**
   * 生日
   */
  @IsOptional()
  @IsDateString()
  birthday?: string;
  /**
   * 签名
   */
  @IsOptional()
  signature?: string;
  /**
   * banner图片url数组
   */
  @IsOptional()
  @IsUrl({}, { message: 'url不合法', each: true })
  bannerList?: string[];
}
