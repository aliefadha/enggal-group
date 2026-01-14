import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { CareerStatus, Gender } from '@prisma/client';

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

  @ApiPropertyOptional({
    enum: CareerStatus,
    example: CareerStatus.PENDING,
    description: 'Career application status'
  })
  @IsOptional()
  @IsEnum(CareerStatus)
  status?: CareerStatus

  @ApiPropertyOptional({ enum: Gender, example: Gender.LAKI_LAKI, description: 'Gender of the applicant' })
  @IsOptional()
  @IsEnum(Gender)
  jenis_kelamin?: Gender

  @ApiPropertyOptional({ example: 'Jakarta' })
  @IsOptional()
  @IsString()
  kota?: string

  @ApiPropertyOptional({ example: '1995-05-20' })
  @IsOptional()
  @IsDateString()
  tanggal_lahir?: string

  constructor(dto: RequestUserCareerUpdateDto) {
    Object.assign(this, dto);
  }
}
