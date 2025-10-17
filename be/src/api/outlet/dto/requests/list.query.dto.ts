import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class OutletListQueryDto {
  @ApiPropertyOptional({ description: 'Page number (1-based)' })
  @IsOptional()
  @IsString()
  page?: string;

  @ApiPropertyOptional({ description: 'Items per page' })
  @IsOptional()
  @IsString()
  limit?: string;

  @ApiPropertyOptional({ description: 'Filter by brand id', example: '9b62c4d3-5f25-4f8f-83cf-3f49a6b8fd7c' })
  @IsOptional()
  @IsUUID()
  brandId?: string;

  constructor(dto: OutletListQueryDto) {
    Object.assign(this, dto);
  }
}
