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
import { PromoService } from '@/api/promo/promo.service';
import { RequestPromoCreateDto } from '@/api/promo/dto/requests/create.dto';
import { RequestPromoUpdateDto } from '@/api/promo/dto/requests/update.dto';
import { PromoListQueryDto } from '@/api/promo/dto/requests/list.query.dto';
import { uploadDiskStorage } from '@/api/upload/upload.storage';
import type { StoredFile } from '@/api/upload/upload.types';

@ApiTags('promo')
@Controller('promo')
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: uploadDiskStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Promo Spesial Akhir Tahun' },
        subtitle: {
          type: 'string',
          example: 'Diskon hingga 50% untuk semua produk',
        },
        description: {
          type: 'string',
          example:
            'Nikmati potongan harga besar untuk berbagai produk pilihan selama periode promo.',
        },
        syaratKetentuan: {
          type: 'string',
          example:
            'Berlaku untuk pembelian minimal Rp500.000 dan tidak dapat digabung dengan promo lain.',
        },
        berlakuHingga: { type: 'string', example: '2024-12-31' },
        brandId: { type: 'string', format: 'uuid' },
        image: { type: 'string', format: 'binary' },
      },
      required: [
        'title',
        'subtitle',
        'description',
        'syaratKetentuan',
        'berlakuHingga',
        'brandId',
        'image',
      ],
    },
  })
  create(
    @Body() dto: RequestPromoCreateDto,
    @UploadedFile() image?: StoredFile,
  ) {
    if (!image) {
      throw new BadRequestException('Image file is required');
    }

    const payload: RequestPromoCreateDto = {
      ...dto,
      image: `/uploads/${image.filename}`,
    };

    return this.promoService.create(payload);
  }

  @Get()
  findAll(@Query() query: PromoListQueryDto) {
    const page = Math.max(1, parseInt(query.page ?? '1', 10) || 1);
    const limitRaw = parseInt(query.limit ?? '10', 10) || 10;
    const limit = Math.min(Math.max(1, limitRaw), 100);
    const startDate = query.startDate ? new Date(query.startDate) : undefined;
    const endDate = query.endDate ? new Date(query.endDate) : undefined;
    return this.promoService.findAll({
      page,
      limit,
      brandId: query.brandId,
      startDate,
      endDate,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promoService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', { storage: uploadDiskStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Promo Spesial Akhir Tahun' },
        subtitle: {
          type: 'string',
          example: 'Diskon hingga 50% untuk semua produk',
        },
        description: {
          type: 'string',
          example:
            'Nikmati potongan harga besar untuk berbagai produk pilihan selama periode promo.',
        },
        syaratKetentuan: {
          type: 'string',
          example:
            'Berlaku untuk pembelian minimal Rp500.000 dan tidak dapat digabung dengan promo lain.',
        },
        berlakuHingga: { type: 'string', example: '2024-12-31' },
        brandId: { type: 'string', format: 'uuid' },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() dto: RequestPromoUpdateDto,
    @UploadedFile() image?: StoredFile,
  ) {
    const payload: RequestPromoUpdateDto = {
      ...dto,
      ...(image ? { image: `/uploads/${image.filename}` } : {}),
    };
    return this.promoService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promoService.remove(id);
  }
}
