import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { BeritaService } from '@/api/berita/berita.service';
import { RequestBeritaCreateDto } from '@/api/berita/dto/requests/create.dto';
import { RequestBeritaUpdateDto } from '@/api/berita/dto/requests/update.dto';
import { BeritaListQueryDto } from '@/api/berita/dto/requests/list.query.dto';
import { uploadDiskStorage } from '@/api/upload/upload.storage';
import type { StoredFile } from '@/api/upload/upload.types';

@ApiTags('berita')
@Controller('berita')
export class BeritaController {
  constructor(private readonly beritaService: BeritaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: uploadDiskStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        judul: { type: 'string', example: 'Grand Opening Outlet Baru' },
        createdDate: { type: 'string', example: '2025-01-15' },
        penulis: { type: 'string', example: 'Tim Marketing' },
        content: {
          type: 'string',
          example: 'Kami dengan bangga mengumumkan pembukaan outlet baru dengan berbagai promo menarik untuk pelanggan setia.',
        },
        image: { type: 'string', format: 'binary' },
      },
      required: ['judul', 'createdDate', 'penulis', 'content'],
    },
  })
  create(@Body() dto: RequestBeritaCreateDto, @UploadedFile() image?: StoredFile) {
    const payload: RequestBeritaCreateDto = {
      ...dto,
      ...(image ? { image: `/uploads/${image.filename}` } : {}),
    };

    return this.beritaService.create(payload);
  }

  @Get()
  findAll(@Query() query: BeritaListQueryDto) {
    const page = Math.max(1, parseInt(query.page ?? '1', 10) || 1);
    const limitRaw = parseInt(query.limit ?? '10', 10) || 10;
    const limit = Math.min(Math.max(1, limitRaw), 100);
    return this.beritaService.findAll({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beritaService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', { storage: uploadDiskStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        judul: { type: 'string', example: 'Grand Opening Outlet Baru' },
        createdDate: { type: 'string', example: '2025-01-15' },
        penulis: { type: 'string', example: 'Tim Marketing' },
        content: {
          type: 'string',
          example: 'Kami dengan bangga mengumumkan pembukaan outlet baru dengan berbagai promo menarik untuk pelanggan setia.',
        },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  update(@Param('id') id: string, @Body() dto: RequestBeritaUpdateDto, @UploadedFile() image?: StoredFile) {
    const payload: RequestBeritaUpdateDto = {
      ...dto,
      ...(image ? { image: `/uploads/${image.filename}` } : {}),
    };

    return this.beritaService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beritaService.remove(id);
  }
}
