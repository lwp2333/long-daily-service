import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export enum MemorialDayTypeEnum {
  countdown = 'countdown',
  cumulative = 'cumulative',
}

export enum DateTypeEnum {
  /** 公历 */
  solar = 'solar',
  /** 农历 */
  lunar = 'lunar',
}
export class CreateMemorialDayDto {
  /**
   * 名称
   */
  @IsNotEmpty({ message: '名称不能为空' })
  name: string;
  /**
   * 图表名称
   */
  @IsNotEmpty({ message: 'icon不能为空' })
  icon: string;
  /**
   * 日期类型
   */
  @ApiProperty({ enum: DateTypeEnum, enumName: 'DateTypeEnum' })
  @IsNotEmpty({ message: '日期类型' })
  dateType: DateTypeEnum;
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
