import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export enum lifeInventoryStatusEnum {
  unFinish = 'unFinish',
  finish = 'finish',
}

export enum fontSizeEnum {
  small = 'small',
  default = 'default',
  middle = 'middle',
  large = 'large',
}

export class CreateLifeInventoryDto {
  /**
   * 名称
   */
  name: string;
  /**
   * 状态
   */
  @ApiProperty({ enum: lifeInventoryStatusEnum, enumName: 'lifeInventoryStatusEnum' })
  @IsNotEmpty({ message: '状态不能为空' })
  status: lifeInventoryStatusEnum;
  /**
   * 显示字体大小
   */
  @IsNotEmpty({ message: '字体大小不能为空' })
  @ApiProperty({ enum: fontSizeEnum, enumName: 'fontSizeEnum' })
  fontSize: fontSizeEnum;
  /**
   * 显示字体颜色
   */
  @IsNotEmpty({ message: '字体颜色不能为空' })
  color: string;
}

export class UpdateLifeInventoryDto extends PartialType(CreateLifeInventoryDto) {}
