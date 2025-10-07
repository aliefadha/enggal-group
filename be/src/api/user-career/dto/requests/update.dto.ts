import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class RequestUserCareerUpdateDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  tanggal?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nama?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  no_hp?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  cv_link?: string

  constructor(dto: RequestUserCareerUpdateDto) {
    Object.assign(this, dto);
  }
}

