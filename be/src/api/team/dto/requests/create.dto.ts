import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class RequestTeamCreateDto {
  @ApiPropertyOptional({ example: '/uploads/team-john-doe.png' })
  @IsOptional()
  @IsNotEmpty()
  image?: string;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  nama!: string;

  @ApiProperty({ example: 'Chief Executive Officer' })
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ example: 'https://www.linkedin.com/in/john-doe' })
  @IsOptional()
  @IsUrl()
  linkedinUrl?: string;

  @ApiPropertyOptional({ example: 'https://www.instagram.com/johndoe' })
  @IsOptional()
  @IsUrl()
  instagramUrl?: string;

  constructor(dto: RequestTeamCreateDto) {
    Object.assign(this, dto);
  }
}
