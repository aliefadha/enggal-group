import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class RequestBrandUpdateDto {
  @ApiPropertyOptional({ example: 'Bakso Enggal' })
  @IsOptional()
  @IsNotEmpty()
  nama?: string;

  @ApiPropertyOptional({ example: '/uploads/bakso-enggal.png' })
  @IsOptional()
  @IsNotEmpty()
  logo?: string;

  @ApiPropertyOptional({
    example: 'Restoran bakso prasmanan pertama di Indonesia.',
  })
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  constructor(dto: RequestBrandUpdateDto) {
    Object.assign(this, dto);
  }
}
