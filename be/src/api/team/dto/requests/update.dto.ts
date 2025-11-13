import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class RequestTeamUpdateDto {
  @ApiPropertyOptional({ example: '/uploads/team-john-doe.png' })
  @IsOptional()
  @IsNotEmpty()
  image?: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsNotEmpty()
  nama?: string;

  @ApiPropertyOptional({ example: 'Chief Executive Officer' })
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @ApiPropertyOptional({ example: 'https://www.linkedin.com/in/john-doe' })
  @IsOptional()
  @IsUrl()
  linkedinUrl?: string;

  @ApiPropertyOptional({ example: 'https://www.instagram.com/johndoe' })
  @IsOptional()
  @IsUrl()
  instagramUrl?: string;

  constructor(dto: RequestTeamUpdateDto) {
    Object.assign(this, dto);
  }
}
