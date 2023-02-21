import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsHexColor, IsNotEmpty, IsNumber } from 'class-validator';

export enum lifeInventoryStatusEnum {
  unFinish = 'unFinish',
  finish = 'finish',
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
  @IsNumber()
  fontSize: number;
  /**
   * 显示字体颜色
   */
  @IsNotEmpty({ message: '字体颜色不能为空' })
  @IsHexColor({ message: '字体颜色必须为hex' })
  color: string;
}

export class UpdateLifeInventoryDto extends PartialType(CreateLifeInventoryDto) {}
