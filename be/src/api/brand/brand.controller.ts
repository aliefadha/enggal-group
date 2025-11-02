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
import { BrandService } from 'src/api/brand/brand.service';
import { RequestBrandCreateDto } from 'src/api/brand/dto/requests/create.dto';
import { RequestBrandUpdateDto } from 'src/api/brand/dto/requests/update.dto';
import { BrandListQueryDto } from 'src/api/brand/dto/requests/list.query.dto';
import { uploadDiskStorage } from 'src/api/upload/upload.storage';
import type { StoredFile } from 'src/api/upload/upload.types';
import { JwtAuthGuard } from '../auth/guard/jwt-guard.auth';

@ApiTags('brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('logo', { storage: uploadDiskStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nama: { type: 'string', example: 'Bakso Enggal' },
        title: { type: 'string', example: 'Restoran Bakso Terbaik di Indonesia' },
        description: {
          type: 'string',
          example: 'Restoran bakso prasmanan pertama di Indonesia.',
        },
        content: {
          type: 'string',
          example: 'Bakso Enggal adalah restoran yang menyediakan berbagai macam bakso dengan kualitas terbaik...'
        },
        logo: { type: 'string', format: 'binary' },
        coverImage: { type: 'string' },
        instagramLink: { type: 'string' },
        facebookLink: { type: 'string' },
        twitterLink: { type: 'string' },
        menuLink: { type: 'string' },
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
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('logo', { storage: uploadDiskStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nama: { type: 'string', example: 'Bakso Enggal' },
        title: { type: 'string', example: 'Restoran Bakso Terbaik di Indonesia' },
        description: {
          type: 'string',
          example: 'Restoran bakso prasmanan pertama di Indonesia.',
        },
        content: {
          type: 'string',
          example: 'Bakso Enggal adalah restoran yang menyediakan berbagai macam bakso dengan kualitas terbaik...'
        },
        logo: { type: 'string', format: 'binary' },
        coverImage: { type: 'string' },
        instagramLink: { type: 'string' },
        facebookLink: { type: 'string' },
        twitterLink: { type: 'string' },
        menuLink: { type: 'string' },
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
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }
}
