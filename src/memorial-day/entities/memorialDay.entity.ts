import { ApiProperty } from '@nestjs/swagger';
import { DateTypeEnum, MemorialDayTypeEnum } from '../dto/memorialDay.dto';

export class MemorialDayEntity {
  /**
   * id
   */
  id: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 图标
   */
  icon: string;
  /**
   * 时间
   */
  date: number;
  /**
   * 日期类型
   */
  dateType: DateTypeEnum;
  /**
   * 日期计算类型
   */
  @ApiProperty({ enum: MemorialDayTypeEnum, enumName: 'MemorialDayTypeEnum' })
  type: MemorialDayTypeEnum;
  /**
   * 最后更新时间
   */
  lastUpdateTime: string;
}
