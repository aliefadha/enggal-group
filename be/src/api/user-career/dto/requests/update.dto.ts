import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

export class RequestUserCareerUpdateDto {
  @ApiPropertyOptional({ example: '2024-05-20' })
  @IsOptional()
  @IsDateString()
  tanggal?: string

  @ApiPropertyOptional({ example: 'Budi Santoso' })
  @IsOptional()
  @IsString()
  nama?: string

  @ApiPropertyOptional({ example: '081234567890' })
  @IsOptional()
  @IsString()
  no_hp?: string

  @ApiPropertyOptional({ example: 'budi@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string

  @ApiPropertyOptional({ example: 'Jl. Merdeka No. 123, Jakarta' })
  @IsOptional()
  @IsString()
  alamat?: string

  @ApiPropertyOptional({ example: '/uploads/cv-budi.pdf' })
  @IsOptional()
  @IsString()
  cv_link?: string

  constructor(dto: RequestUserCareerUpdateDto) {
    Object.assign(this, dto);
  }
}
