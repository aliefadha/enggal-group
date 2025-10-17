import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RequestBeritaUpdateDto {
  @ApiPropertyOptional({ example: 'Grand Opening Outlet Baru' })
  @IsOptional()
  @IsNotEmpty()
  judul?: string;

  @ApiPropertyOptional({ example: '2025-01-15' })
  @IsOptional()
  @IsDateString()
  createdDate?: string;

  @ApiPropertyOptional({ example: 'Tim Marketing' })
  @IsOptional()
  @IsNotEmpty()
  penulis?: string;

  @ApiPropertyOptional({
    example: 'Kami dengan bangga mengumumkan pembukaan outlet baru dengan berbagai promo menarik untuk pelanggan setia.',
  })
  @IsOptional()
  @IsNotEmpty()
  content?: string;

  @ApiPropertyOptional({ example: '/uploads/berita-opening.png' })
  @IsOptional()
  @IsString()
  image?: string;

  constructor(dto: RequestBeritaUpdateDto) {
    Object.assign(this, dto);
  }
}
