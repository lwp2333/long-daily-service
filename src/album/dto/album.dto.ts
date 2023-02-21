import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateAlbumDto {
  /**
   * 名称
   */
  @IsNotEmpty({ message: '相册名称不能为空' })
  name: string;
  /**
   * 封面图
   */
  @IsNotEmpty({ message: '封面图不能为空' })
  @IsUrl({}, { message: 'url不合法' })
  coverUrl: string;
}

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {}
