import { AssetEntity } from '@/asset/entities/asset.entity';
export class Album {
  /**
   * id
   */
  id: number;
  /**
   * 相册名
   */
  name: string;
  /**
   * 描述
   */
  desc: string;
  /**
   * 封面图
   */
  coverUrl: string;
  /**
   * 照片/视频数量
   */
  assetCount: number;
  /**
   * 最新更新时间
   */
  lastUpdateTime: Date;
}

export class AlbumDetail extends Album {
  assets: AssetEntity[];
}
