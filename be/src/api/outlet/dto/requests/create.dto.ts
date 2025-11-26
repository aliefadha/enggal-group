import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID, IsUrl } from 'class-validator';

export class RequestOutletCreateDto {
  @ApiProperty({ example: 'Bakso Enggal Jakarta' })
  @IsNotEmpty()
  nama!: string;

  @ApiProperty({ example: '08:00 - 22:00 WIB' })
  @IsNotEmpty()
  jamOperasional!: string;

  @ApiProperty({ example: 'Jl. Jenderal Sudirman No. 1, Jakarta' })
  @IsNotEmpty()
  lokasi!: string;

  @ApiProperty({ example: 'Jakarta' })
  @IsNotEmpty()
  provinsi!: string;

  @ApiPropertyOptional({ example: '/uploads/outlet-jakarta.png' })
  @IsOptional()
  image?: string;

  @ApiProperty({ example: 'https://maps.app.goo.gl/abcdefghijk' })
  @IsNotEmpty()
  @IsUrl()
  googleMapsLink!: string;

  @ApiPropertyOptional({ example: 'https://wa.me/6281234567890' })
  @IsOptional()
  @IsUrl()
  whatsappUrl?: string;

  @ApiProperty({ example: '9b62c4d3-5f25-4f8f-83cf-3f49a6b8fd7c' })
  @IsNotEmpty()
  @IsUUID()
  brandId!: string;

  constructor(dto: RequestOutletCreateDto) {
    Object.assign(this, dto);
  }
}
