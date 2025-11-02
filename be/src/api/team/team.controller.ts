import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { TeamService } from 'src/api/team/team.service';
import { RequestTeamCreateDto } from 'src/api/team/dto/requests/create.dto';
import { RequestTeamUpdateDto } from 'src/api/team/dto/requests/update.dto';
import { TeamListQueryDto } from 'src/api/team/dto/requests/list.query.dto';
import { uploadDiskStorage } from 'src/api/upload/upload.storage';
import type { StoredFile } from 'src/api/upload/upload.types';
import { JwtAuthGuard } from '../auth/guard/jwt-guard.auth';

@ApiTags('team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', { storage: uploadDiskStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nama: { type: 'string', example: 'John Doe' },
        title: { type: 'string', example: 'Chief Executive Officer' },
        linkedinUrl: {
          type: 'string',
          example: 'https://www.linkedin.com/in/john-doe',
        },
        instagramUrl: {
          type: 'string',
          example: 'https://www.instagram.com/johndoe',
        },
        image: { type: 'string', format: 'binary' },
      },
      required: ['nama', 'title', 'linkedinUrl', 'instagramUrl', 'image'],
    },
  })
  create(
    @Body() dto: RequestTeamCreateDto,
    @UploadedFile() image?: StoredFile,
  ) {
    if (!image) {
      throw new BadRequestException('Image file is required');
    }

    const payload: RequestTeamCreateDto = {
      ...dto,
      image: `/uploads/${image.filename}`,
    };

    return this.teamService.create(payload);
  }

  @Get()
  findAll(@Query() query: TeamListQueryDto) {
    const page = Math.max(1, parseInt(query.page ?? '1', 10) || 1);
    const limitRaw = parseInt(query.limit ?? '10', 10) || 10;
    const limit = Math.min(Math.max(1, limitRaw), 100);

    return this.teamService.findAll({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', { storage: uploadDiskStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nama: { type: 'string', example: 'John Doe' },
        title: { type: 'string', example: 'Chief Executive Officer' },
        linkedinUrl: {
          type: 'string',
          example: 'https://www.linkedin.com/in/john-doe',
        },
        instagramUrl: {
          type: 'string',
          example: 'https://www.instagram.com/johndoe',
        },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() dto: RequestTeamUpdateDto,
    @UploadedFile() image?: StoredFile,
  ) {
    const payload: RequestTeamUpdateDto = {
      ...dto,
      ...(image ? { image: `/uploads/${image.filename}` } : {}),
    };

    return this.teamService.update(id, payload);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.teamService.remove(id);
  }
}
