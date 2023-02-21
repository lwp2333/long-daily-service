import { AssetEntity } from '@/asset/entities/asset.entity';

export class PlogEntity {
  id: number;
  content: string;
  lastUpdateTime: string;
  address: string;
  userOpenid: string;
  assets: AssetEntity[];
}
