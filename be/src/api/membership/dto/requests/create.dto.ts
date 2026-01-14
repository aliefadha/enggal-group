import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class RequestMembershipCreateDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  nama!: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsNotEmpty()
  @IsString()
  email!: string;

  @ApiProperty({ example: '081234567890' })
  @IsNotEmpty()
  @IsString()
  no_hp!: string;

  @ApiProperty({ example: 'LAKI_LAKI', enum: ['LAKI_LAKI', 'PEREMPUAN'] })
  @IsNotEmpty()
  @IsIn(['LAKI_LAKI', 'PEREMPUAN'])
  jenis_kelamin!: string;

  @ApiProperty({ example: 'Jakarta' })
  @IsNotEmpty()
  @IsString()
  kota!: string;

  @ApiProperty({ example: '1990-01-15' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  tanggal_lahir!: Date;
}
