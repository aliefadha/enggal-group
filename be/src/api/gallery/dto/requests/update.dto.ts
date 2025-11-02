import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class RequestGalleryUpdateDto {
  @ApiPropertyOptional({ example: '/uploads/gallery/image1.jpg' })
  @IsOptional()
  @IsNotEmpty()
  image?: string;

  @ApiPropertyOptional({ example: 'Delicious bakso served fresh!' })
  @IsOptional()
  @IsNotEmpty()
  caption?: string;

  @ApiPropertyOptional({ example: 'https://instagram.com/p/ABC123' })
  @IsOptional()
  @IsUrl()
  instagramUrl?: string;

  constructor(dto: RequestGalleryUpdateDto) {
    Object.assign(this, dto);
  }
}
