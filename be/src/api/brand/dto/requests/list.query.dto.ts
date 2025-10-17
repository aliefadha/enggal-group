import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class BrandListQueryDto {
  @ApiPropertyOptional({ description: 'Page number (1-based)' })
  @IsOptional()
  @IsString()
  page?: string;

  @ApiPropertyOptional({ description: 'Items per page' })
  @IsOptional()
  @IsString()
  limit?: string;

  constructor(dto: BrandListQueryDto) {
    Object.assign(this, dto);
  }
}
