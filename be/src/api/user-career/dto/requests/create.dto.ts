import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsUrl } from 'class-validator';

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

  @ApiProperty({ example: 'https://example.com/cv/budi.pdf' })
  @IsNotEmpty()
  @IsUrl()
  cv_link!: string

  constructor(dto: RequestUserCareerCreateDto) {
    Object.assign(this, dto);
  }
}
