import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID, IsUrl } from 'class-validator';

export class RequestOutletUpdateDto {
  @ApiPropertyOptional({ example: 'Jakarta' })
  @IsOptional()
  @IsNotEmpty()
  kota?: string;

  @ApiPropertyOptional({ example: '08:00 - 22:00 WIB' })
  @IsOptional()
  @IsNotEmpty()
  jamOperasional?: string;

  @ApiPropertyOptional({ example: 'Jl. Jenderal Sudirman No. 1, Jakarta' })
  @IsOptional()
  @IsNotEmpty()
  lokasi?: string;

  @ApiPropertyOptional({ example: '/uploads/outlet-jakarta.png' })
  @IsOptional()
  @IsNotEmpty()
  image?: string;

  @ApiPropertyOptional({ example: 'https://maps.app.goo.gl/abcdefghijk' })
  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  googleMapsLink?: string;

  @ApiPropertyOptional({ example: 'https://wa.me/6281234567890' })
  @IsOptional()
  @IsUrl()
  whatsappUrl?: string;

  @ApiPropertyOptional({ example: '9b62c4d3-5f25-4f8f-83cf-3f49a6b8fd7c' })
  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  brandId?: string;

  constructor(dto: RequestOutletUpdateDto) {
    Object.assign(this, dto);
  }
}
