import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { CareerStatus } from '@prisma/client';

export class UserCareerListQueryDto {
  @ApiPropertyOptional({ description: 'Page number (1-based)', default: 1 })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ description: 'Items per page', default: 10 })
  @IsOptional()
  @IsNumberString()
  limit?: string;

  @ApiPropertyOptional({
    description: 'Filter by tanggal greater than or equal to this ISO date',
    example: '2024-01-01',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'Filter by tanggal less than or equal to this ISO date',
    example: '2024-12-31',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    enum: CareerStatus,
    description: 'Filter by career status',
    example: CareerStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(CareerStatus)
  status?: CareerStatus;

  constructor(dto: UserCareerListQueryDto) {
    Object.assign(this, dto);
  }
}
