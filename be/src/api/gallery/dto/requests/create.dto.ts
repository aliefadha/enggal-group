import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUrl, IsUUID } from 'class-validator';

export class RequestGalleryCreateDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  @IsUUID()
  brandId!: string;

  @ApiPropertyOptional({ example: '/uploads/gallery/image1.jpg' })
  @IsOptional()
  @IsNotEmpty()
  image?: string;

  @ApiProperty({ example: 'Delicious bakso served fresh!' })
  @IsNotEmpty()
  caption!: string;

  @ApiPropertyOptional({ example: 'https://instagram.com/p/ABC123' })
  @IsOptional()
  @IsUrl()
  instagramUrl?: string;

  constructor(dto: RequestGalleryCreateDto) {
    Object.assign(this, dto);
  }
}
