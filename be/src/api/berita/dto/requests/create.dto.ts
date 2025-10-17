import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RequestBeritaCreateDto {
  @ApiProperty({ example: 'Grand Opening Outlet Baru' })
  @IsNotEmpty()
  judul!: string;

  @ApiProperty({ example: '2025-01-15' })
  @IsDateString()
  createdDate!: string;

  @ApiProperty({ example: 'Tim Marketing' })
  @IsNotEmpty()
  penulis!: string;

  @ApiProperty({
    example: 'Kami dengan bangga mengumumkan pembukaan outlet baru dengan berbagai promo menarik untuk pelanggan setia.',
  })
  @IsNotEmpty()
  content!: string;

  @ApiPropertyOptional({ example: '/uploads/berita-opening.png' })
  @IsOptional()
  @IsString()
  image?: string;

  constructor(dto: RequestBeritaCreateDto) {
    Object.assign(this, dto);
  }
}
