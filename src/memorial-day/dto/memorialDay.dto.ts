import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export enum MemorialDayTypeEnum {
  countdown = 'countdown',
  cumulative = 'cumulative',
}

export class CreateMemorialDayDto {
  /**
   * 名称
   */
  name: string;
  /**
   * 日期
   */
  @IsDateString({ message: '必须为日期格式' })
  @IsNotEmpty({ message: '日期不能为空' })
  date: string;
  /**
   * 时间计算类型
   */
  @ApiProperty({ enum: MemorialDayTypeEnum, enumName: 'MemorialDayTypeEnum' })
  @IsNotEmpty({ message: '时间计算类型' })
  type: MemorialDayTypeEnum;
}

export class UpdateMemorialDayDto extends PartialType(CreateMemorialDayDto) {}
