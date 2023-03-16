import { AssetEntity } from '@/asset/entities/asset.entity';
export class AlbumEntity {
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

export class AlbumDetailEntity extends AlbumEntity {
  /**
   * 照片数量
   */
  imagesCount: number;
  /**
   * 视频数量
   */
  videosCount: number;
  /**
   * 时间分组列表
   */
  groupList: GroupList[];
}

export class GroupList {
  date: string;
  list: AssetEntity[];
}
