enum EnumAssetType {
  unknown,
  image,
  video,
  audio,
}

export class AssetEntity {
  id: string;
  url: string;
  type: EnumAssetType;
  sort: number;
  size: number;
  albumId: number;
  plogId: number;
  userOpenid: string;
  lastUpdateTime: string;
}
