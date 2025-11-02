import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class RequestPromoUpdateDto {
  @ApiPropertyOptional({ example: 'Promo Spesial Akhir Tahun' })
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @ApiPropertyOptional({ example: 'Diskon hingga 50% untuk semua produk' })
  @IsOptional()
  @IsNotEmpty()
  subtitle?: string;

  @ApiPropertyOptional({ example: 'Nikmati potongan harga besar untuk berbagai produk pilihan selama periode promo.' })
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @ApiPropertyOptional({ example: 'Berlaku untuk pembelian minimal Rp500.000 dan tidak dapat digabung dengan promo lain.' })
  @IsOptional()
  @IsNotEmpty()
  syaratKetentuan?: string;

  @ApiPropertyOptional({ example: '2024-12-31' })
  @IsOptional()
  @IsDateString()
  berlakuHingga?: string;

  @ApiPropertyOptional({ example: '9b62c4d3-5f25-4f8f-83cf-3f49a6b8fd7c' })
  @IsOptional()
  @IsUUID()
  brandId?: string;

  @ApiPropertyOptional({ example: '/uploads/promo-spesial.png' })
  @IsOptional()
  @IsNotEmpty()
  image?: string;

  @ApiPropertyOptional({ example: '/uploads/promo-banner.png' })
  @IsOptional()
  @IsNotEmpty()
  banner?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  showBanner?: boolean;

  constructor(dto: RequestPromoUpdateDto) {
    Object.assign(this, dto);
  }
}
