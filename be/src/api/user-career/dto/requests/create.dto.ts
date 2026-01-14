import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CareerStatus, Gender } from '@prisma/client';

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

  @ApiProperty({ enum: Gender, example: Gender.LAKI_LAKI, description: 'Gender of the applicant' })
  @IsEnum(Gender)
  jenis_kelamin!: Gender

  @ApiProperty({ example: 'Jakarta' })
  @IsNotEmpty()
  @IsString()
  kota!: string

  @ApiPropertyOptional({ example: '1995-05-20' })
  @IsOptional()
  @IsDateString()
  tanggal_lahir?: string

  constructor(dto: RequestUserCareerCreateDto) {
    Object.assign(this, dto);
  }
}
