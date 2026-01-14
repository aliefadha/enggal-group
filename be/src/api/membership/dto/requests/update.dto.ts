import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsIn, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class RequestMembershipUpdateDto {
  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  nama?: string;

  @ApiPropertyOptional({ example: 'john.doe@example.com' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ example: '081234567890' })
  @IsOptional()
  @IsString()
  no_hp?: string;

  @ApiPropertyOptional({ example: 'LAKI_LAKI', enum: ['LAKI_LAKI', 'PEREMPUAN'] })
  @IsOptional()
  @IsIn(['LAKI_LAKI', 'PEREMPUAN'])
  jenis_kelamin?: string;

  @ApiPropertyOptional({ example: 'Jakarta' })
  @IsOptional()
  @IsString()
  kota?: string;

  @ApiPropertyOptional({ example: '1990-01-15' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  tanggal_lahir?: Date;
}
