import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUrl } from 'class-validator';

export enum AssetTypeEnum {
  unknown = 'unknown',
  image = 'image',
  video = 'video',
  audio = 'audio',
}

export class CreateAssetDto {
  /**
   * 名称
   */
  @IsUrl({}, { message: 'url不合法' })
  url: string;
  /**
   * 封面图
   */
  @IsOptional()
  @IsUrl({}, { message: 'url不合法' })
  poster?: string;
  /**
   * 资源类型
   */
  @ApiProperty({ enum: AssetTypeEnum, enumName: 'AssetTypeEnum' })
  @IsNotEmpty({ message: '类型不能为空' })
  type: AssetTypeEnum;
  /**
   * 资源大小
   */
  @IsNotEmpty({ message: '大小不能为空' })
  @IsNumber()
  size: number;
  /**
   * 排序
   */
  @IsNotEmpty({ message: '排序不能为空' })
  @IsNumber()
  sort: number;
  /**
   * 相册id
   */
  @IsNotEmpty({ message: '归属相册id不能为空' })
  albumId: number;
  /**
   * 动态id
   */
  @IsOptional()
  @IsNotEmpty({ message: '归属动态id不能为空' })
  plogId?: number;
}
