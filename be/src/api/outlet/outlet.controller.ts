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
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { OutletService } from 'src/api/outlet/outlet.service';
import { RequestOutletCreateDto } from 'src/api/outlet/dto/requests/create.dto';
import { RequestOutletUpdateDto } from 'src/api/outlet/dto/requests/update.dto';
import { OutletListQueryDto } from 'src/api/outlet/dto/requests/list.query.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadDiskStorage } from '../upload/upload.storage';
import { StoredFile } from '../upload/upload.types';
import { JwtAuthGuard } from '../auth/guard/jwt-guard.auth';

@ApiTags('outlet')
@Controller('outlet')
export class OutletController {
  constructor(private readonly outletService: OutletService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', { storage: uploadDiskStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nama: { type: 'string', example: 'Bakso Enggal Jakarta' },
        jamOperasional: { type: 'string', example: '08:00 - 22:00' },
        lokasi: {
          type: 'string',
          example: 'Jl. Jenderal Sudirman No. 1, Jakarta',
        },
        googleMapsLink: {
          type: 'string',
          example: 'https://maps.app.goo.gl/abcdefghijk',
        },
        whatsappUrl: { type: 'string', example: 'https://wa.me/6281234567890' },
        brandId: {
          type: 'string',
          example: '70a368c5-a3c3-4668-a2f4-f60d2ca61619',
        },
        image: { type: 'string', format: 'binary' },
      },
      required: [
        'nama',
        'jamOperasional',
        'lokasi',
        'googleMapsLink',
        'whatsappUrl',
        'brandId',
        'image',
      ],
    },
  })
  create(
    @Body() dto: RequestOutletCreateDto,
    @UploadedFile() image?: StoredFile,
  ) {
    if (!image) {
      throw new BadRequestException('Image file is required');
    }

    const payload: RequestOutletCreateDto = {
      ...dto,
      image: `/uploads/${image.filename}`,
    };

    return this.outletService.create(payload);
  }

  @Get()
  findAll(@Query() query: OutletListQueryDto) {
    const page = Math.max(1, parseInt(query.page ?? '1', 10) || 1);
    const limitRaw = parseInt(query.limit ?? '10', 10) || 10;
    const limit = Math.min(Math.max(1, limitRaw), 100);

    // Validate sortOrder
    const sortOrder = query.sortOrder === 'asc' ? 'asc' : 'desc';

    return this.outletService.findAll({
      page,
      limit,
      brandId: query.brandId,
      sortBy: query.sortBy,
      sortOrder,
    });
  }

  @Get('count-by-brand/:brandName')
  async countByBrandName(@Param('brandName') brandName: string) {
    return this.outletService.countByBrandName(brandName);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.outletService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', { storage: uploadDiskStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nama: { type: 'string', example: 'Bakso Enggal Jakarta' },
        jamOperasional: { type: 'string', example: '08:00 - 22:00' },
        lokasi: {
          type: 'string',
          example: 'Jl. Jenderal Sudirman No. 1, Jakarta',
        },
        googleMapsLink: {
          type: 'string',
          example: 'https://maps.app.goo.gl/abcdefghijk',
        },
        whatsappUrl: { type: 'string', example: 'https://wa.me/6281234567890' },
        brandId: {
          type: 'string',
          example: '70a368c5-a3c3-4668-a2f4-f60d2ca61619',
        },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() dto: RequestOutletUpdateDto,
    @UploadedFile() image?: StoredFile,
  ) {
    const payload: RequestOutletUpdateDto = {
      ...dto,
      ...(image ? { image: `/uploads/${image.filename}` } : {}),
    };

    return this.outletService.update(id, payload);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.outletService.remove(id);
  }

}
