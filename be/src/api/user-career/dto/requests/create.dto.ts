import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { CareerStatus } from '@prisma/client';

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

  @ApiPropertyOptional({
    enum: CareerStatus,
    example: CareerStatus.PENDING,
    description: 'Career application status'
  })
  @IsOptional()
  @IsEnum(CareerStatus)
  status?: CareerStatus

  constructor(dto: RequestUserCareerCreateDto) {
    Object.assign(this, dto);
  }
}
