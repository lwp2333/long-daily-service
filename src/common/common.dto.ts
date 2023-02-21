import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class ByPageDto {
  /**
   * 页码
   */
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(100)
  pageIndex: number;
  /**
   * 分页大小
   */
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(999)
  pageSize: number;
}
