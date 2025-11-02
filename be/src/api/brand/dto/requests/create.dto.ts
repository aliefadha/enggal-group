import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class RequestBrandCreateDto {
  @ApiProperty({ example: 'Bakso Enggal' })
  @IsNotEmpty()
  nama!: string;

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

  @ApiProperty({ example: 'Restoran bakso prasmanan pertama di Indonesia.' })
  @IsNotEmpty()
  description!: string;

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

  constructor(dto: RequestBrandCreateDto) {
    Object.assign(this, dto);
  }
}
