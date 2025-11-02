import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class RequestUserCareerCreateDto {
  @ApiProperty({ example: '2024-05-20' })
  @IsDateString()
  tanggal!: string

  @ApiProperty({ example: 'Budi Santoso' })
  @IsNotEmpty()
  nama!: string

  @ApiProperty({ example: '081234567890' })
  @IsNotEmpty()
  no_hp!: string

  @ApiProperty({ example: 'budi@example.com' })
  @IsEmail()
  email!: string

  @ApiProperty({ example: 'Jl. Merdeka No. 123, Jakarta' })
  @IsNotEmpty()
  alamat!: string

  @ApiPropertyOptional({ example: '/uploads/cv-budi.pdf' })
  @IsOptional()
  @IsNotEmpty()
  cv_link?: string

  constructor(dto: RequestUserCareerCreateDto) {
    Object.assign(this, dto);
  }
}
