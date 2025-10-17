import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class RequestBrandCreateDto {
  @ApiProperty({ example: 'Bakso Enggal' })
  @IsNotEmpty()
  nama!: string;

  @ApiPropertyOptional({ example: '/uploads/bakso-enggal.png' })
  @IsOptional()
  @IsNotEmpty()
  logo?: string;

  @ApiProperty({ example: 'Restoran bakso prasmanan pertama di Indonesia.' })
  @IsNotEmpty()
  description!: string;

  constructor(dto: RequestBrandCreateDto) {
    Object.assign(this, dto);
  }
}
