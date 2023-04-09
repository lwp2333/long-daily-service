import { AssetTypeEnum } from '../dto/asset.dto';

export class AssetEntity {
  id: number;
  url: string;
  poster: string;
  type: AssetTypeEnum;
  sort: number;
  size: number;
  albumId: number;
  plogId: number;
  userOpenid: string;
  lastUpdateTime: string;
}

export class AssetTypeCountEntity {
  imageCount: number;
  videoCount: number;
  audioCount: number;
}
