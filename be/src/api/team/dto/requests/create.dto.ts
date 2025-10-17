import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class RequestTeamCreateDto {
  @ApiProperty({ example: '/uploads/team-john-doe.png' })
  @IsNotEmpty()
  image!: string;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  nama!: string;

  @ApiProperty({ example: 'Chief Executive Officer' })
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'https://www.linkedin.com/in/john-doe' })
  @IsNotEmpty()
  @IsUrl()
  linkedinUrl!: string;

  @ApiProperty({ example: 'https://www.instagram.com/johndoe' })
  @IsNotEmpty()
  @IsUrl()
  instagramUrl!: string;

  constructor(dto: RequestTeamCreateDto) {
    Object.assign(this, dto);
  }
}
