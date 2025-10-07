import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class RequestUseCreateDto {
  @ApiProperty()
  @IsEmail()
  email!: string

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password!: string

  @ApiProperty()
  @IsNotEmpty()
  nama!: string

  constructor(dto: RequestUseCreateDto) {
    Object.assign(this, dto);
  }
}