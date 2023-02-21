import { ApiProperty } from '@nestjs/swagger';
import { MemorialDayTypeEnum } from '../dto/memorialDay.dto';

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
   * 时间
   */
  date: number;
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
