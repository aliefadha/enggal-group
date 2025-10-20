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
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { BrandService } from '@/api/brand/brand.service';
import { RequestBrandCreateDto } from '@/api/brand/dto/requests/create.dto';
import { RequestBrandUpdateDto } from '@/api/brand/dto/requests/update.dto';
import { BrandListQueryDto } from '@/api/brand/dto/requests/list.query.dto';
import { uploadDiskStorage } from '@/api/upload/upload.storage';
import type { StoredFile } from '@/api/upload/upload.types';

@ApiTags('brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @UseInterceptors(FileInterceptor('logo', { storage: uploadDiskStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nama: { type: 'string', example: 'Bakso Enggal' },
        description: {
          type: 'string',
          example: 'Restoran bakso prasmanan pertama di Indonesia.',
        },
        logo: { type: 'string', format: 'binary' },
      },
      required: ['nama', 'description', 'logo'],
    },
  })
  create(
    @Body() dto: RequestBrandCreateDto,
    @UploadedFile() logo?: StoredFile,
  ) {
    if (!logo) {
      throw new BadRequestException('Logo file is required');
    }

    const payload: RequestBrandCreateDto = {
      ...dto,
      logo: `/uploads/${logo.filename}`,
    };

    return this.brandService.create(payload);
  }

  @Get()
  findAll(@Query() query: BrandListQueryDto) {
    const page = Math.max(1, parseInt(query.page ?? '1', 10) || 1);
    const limitRaw = parseInt(query.limit ?? '10', 10) || 10;
    const limit = Math.min(Math.max(1, limitRaw), 100);
    return this.brandService.findAll({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('logo', { storage: uploadDiskStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nama: { type: 'string', example: 'Bakso Enggal' },
        description: {
          type: 'string',
          example: 'Restoran bakso prasmanan pertama di Indonesia.',
        },
        logo: { type: 'string', format: 'binary' },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() dto: RequestBrandUpdateDto,
    @UploadedFile() logo?: StoredFile,
  ) {
    const payload: RequestBrandUpdateDto = {
      ...dto,
      ...(logo ? { logo: `/uploads/${logo.filename}` } : {}),
    };

    return this.brandService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }
}
