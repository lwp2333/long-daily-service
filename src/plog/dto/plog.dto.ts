import { CreateAssetDto } from '@/asset/dto/asset.dto';
import { ByPageDto } from '@/common/common.dto';
import { OmitType, PartialType } from '@nestjs/swagger';

export class CreateAssetsInPlog extends OmitType(CreateAssetDto, ['plogId']) {}
export class CreatePlogDto {
  /**
   * 内容
   */
  content: string;
  /**
   * 位置
   */
  address: string;
  /**
   * 资源
   */
  assets: CreateAssetsInPlog[];
}
export class UpdatePlogDto extends PartialType(CreatePlogDto) {}

export class GetListByPageDto extends ByPageDto {}
