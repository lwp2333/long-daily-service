import { ByPageDto } from '@/common/common.dto';
import { PartialType } from '@nestjs/swagger';

export class CreatePlogDto {
  /**
   * 内容
   */
  content: string;
  /**
   * 位置
   */
  address: string;
}
export class UpdatePlogDto extends PartialType(CreatePlogDto) {}

export class GetListByPageDto extends ByPageDto {}
