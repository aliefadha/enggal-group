import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class RequestPromoCreateDto {
  @ApiProperty({ example: 'Promo Spesial Akhir Tahun' })
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Diskon hingga 50% untuk semua produk' })
  @IsNotEmpty()
  subtitle!: string;

  @ApiProperty({ example: 'Nikmati potongan harga besar untuk berbagai produk pilihan selama periode promo.' })
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: 'Berlaku untuk pembelian minimal Rp500.000 dan tidak dapat digabung dengan promo lain.' })
  @IsNotEmpty()
  syaratKetentuan!: string;

  @ApiProperty({ example: '2024-12-31' })
  @IsDateString()
  berlakuHingga!: string;

  @ApiProperty({ example: '9b62c4d3-5f25-4f8f-83cf-3f49a6b8fd7c' })
  @IsNotEmpty()
  @IsUUID()
  brandId!: string;

  @ApiPropertyOptional({ example: '/uploads/promo-spesial.png' })
  @IsOptional()
  @IsNotEmpty()
  image?: string;

  constructor(dto: RequestPromoCreateDto) {
    Object.assign(this, dto);
  }
}
