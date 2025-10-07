import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsUrl } from 'class-validator';

export class RequestUserCareerCreateDto {
  @ApiProperty()
  @IsDateString()
  tanggal!: string

  @ApiProperty()
  @IsNotEmpty()
  nama!: string

  @ApiProperty()
  @IsNotEmpty()
  no_hp!: string

  @ApiProperty()
  @IsEmail()
  email!: string

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  cv_link!: string

  constructor(dto: RequestUserCareerCreateDto) {
    Object.assign(this, dto);
  }
}

