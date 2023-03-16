import { ApiProperty } from '@nestjs/swagger';
import { fontSizeEnum, lifeInventoryStatusEnum } from '../dto/lifeInventory.dto';

export class LifeInventoryEntity {
  /**
   * id
   */
  id: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 状态
   */
  @ApiProperty({ enum: lifeInventoryStatusEnum, enumName: 'lifeInventoryStatusEnum' })
  status: lifeInventoryStatusEnum;
  /**
   * 显示字体大小
   */
  @ApiProperty({ enum: fontSizeEnum, enumName: 'fontSizeEnum' })
  fontSize: fontSizeEnum;
  /**
   * 显示字体颜色
   */
  color: string;
  /**
   * 最后更新时间
   */
  lastUpdateTime: string;
}
