import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class PromoListQueryDto {
  @ApiPropertyOptional({ description: 'Page number (1-based)' })
  @IsOptional()
  @IsString()
  page?: string;

  @ApiPropertyOptional({ description: 'Items per page' })
  @IsOptional()
  @IsString()
  limit?: string;

  @ApiPropertyOptional({
    description: 'Filter by brand ID',
    example: '9b62c4d3-5f25-4f8f-83cf-3f49a6b8fd7c',
  })
  @IsOptional()
  @IsUUID()
  brandId?: string;

  @ApiPropertyOptional({
    description:
      'Filter by berlakuHingga greater than or equal to this ISO date',
    example: '2024-01-01',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'Filter by berlakuHingga less than or equal to this ISO date',
    example: '2024-12-31',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  constructor(dto: PromoListQueryDto) {
    Object.assign(this, dto);
  }
}
