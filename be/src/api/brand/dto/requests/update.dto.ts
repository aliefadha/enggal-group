import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class RequestBrandUpdateDto {
  @ApiPropertyOptional({ example: 'Bakso Enggal' })
  @IsOptional()
  @IsNotEmpty()
  nama?: string;

  @ApiPropertyOptional({ example: '/uploads/bakso-enggal.png' })
  @IsOptional()
  @IsNotEmpty()
  logo?: string;

  @ApiPropertyOptional({ example: '/uploads/bakso-enggal-cover.png' })
  @IsOptional()
  @IsNotEmpty()
  coverImage?: string;

  @ApiPropertyOptional({ example: 'Restoran Bakso Terbaik di Indonesia' })
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @ApiPropertyOptional({
    example: 'Restoran bakso prasmanan pertama di Indonesia.',
  })
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @ApiPropertyOptional({ example: 'Bakso Enggal adalah restoran yang menyediakan berbagai macam bakso dengan kualitas terbaik...' })
  @IsOptional()
  @IsNotEmpty()
  content?: string;

  @ApiPropertyOptional({ example: 'https://instagram.com/baksoenggal' })
  @IsOptional()
  @IsUrl()
  instagramLink?: string;

  @ApiPropertyOptional({ example: 'https://facebook.com/baksoenggal' })
  @IsOptional()
  @IsUrl()
  facebookLink?: string;

  @ApiPropertyOptional({ example: 'https://twitter.com/baksoenggal' })
  @IsOptional()
  @IsUrl()
  twitterLink?: string;

  @ApiPropertyOptional({ example: 'https://menu.baksoenggal.com' })
  @IsOptional()
  @IsUrl()
  menuLink?: string;

  constructor(dto: RequestBrandUpdateDto) {
    Object.assign(this, dto);
  }
}
