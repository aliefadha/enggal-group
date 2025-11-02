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
import { GalleryService } from './gallery.service';
import { RequestGalleryCreateDto } from './dto/requests/create.dto';
import { RequestGalleryUpdateDto } from './dto/requests/update.dto';
import { GalleryListQueryDto } from './dto/requests/list.query.dto';
import { uploadDiskStorage } from 'src/api/upload/upload.storage';
import type { StoredFile } from 'src/api/upload/upload.types';
import { JwtAuthGuard } from '../auth/guard/jwt-guard.auth';

@ApiTags('gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', { storage: uploadDiskStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        brandId: {
          type: 'string',
          example: '123e4567-e89b-12d3-a456-426614174000',
        },
        caption: { type: 'string', example: 'Delicious bakso served fresh!' },
        instagramUrl: {
          type: 'string',
          example: 'https://instagram.com/p/ABC123',
        },
        image: { type: 'string', format: 'binary' },
      },
      required: ['brandId', 'caption', 'image'],
    },
  })
  create(
    @Body() dto: RequestGalleryCreateDto,
    @UploadedFile() image?: StoredFile,
  ) {
    if (!image) {
      throw new BadRequestException('Image file is required');
    }

    const payload: RequestGalleryCreateDto = {
      ...dto,
      image: `/uploads/${image.filename}`,
    };

    return this.galleryService.create(payload);
  }

  @Get()
  findAll(@Query() query: GalleryListQueryDto) {
    const page = Math.max(1, parseInt(query.page ?? '1', 10) || 1);
    const limitRaw = parseInt(query.limit ?? '10', 10) || 10;
    const limit = Math.min(Math.max(1, limitRaw), 100);
    return this.galleryService.findAll({
      brandId: query.brandId,
      page,
      limit,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', { storage: uploadDiskStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        caption: { type: 'string', example: 'Delicious bakso served fresh!' },
        instagramUrl: {
          type: 'string',
          example: 'https://instagram.com/p/ABC123',
        },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() dto: RequestGalleryUpdateDto,
    @UploadedFile() image?: StoredFile,
  ) {
    const payload: RequestGalleryUpdateDto = {
      ...dto,
      ...(image ? { image: `/uploads/${image.filename}` } : {}),
    };

    return this.galleryService.update(id, payload);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.galleryService.remove(id);
  }
}
