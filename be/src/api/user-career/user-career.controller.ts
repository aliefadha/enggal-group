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
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserCareerService } from './user-career.service';
import { RequestUserCareerCreateDto } from 'src/api/user-career/dto/requests/create.dto';
import { RequestUserCareerUpdateDto } from 'src/api/user-career/dto/requests/update.dto';
import { UserCareerListQueryDto } from 'src/api/user-career/dto/requests/list.query.dto';
import { uploadDiskStorage } from '../upload/upload.storage';
import type { StoredFile } from '../upload/upload.types';

@ApiTags('user-career')
@Controller('user-career')
export class UserCareerController {
  constructor(private readonly service: UserCareerService) {}

  @Post()
  @UseInterceptors(FileInterceptor('cv', { storage: uploadDiskStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        tanggal: { type: 'string', example: '2024-05-20' },
        nama: { type: 'string', example: 'Budi Santoso' },
        no_hp: { type: 'string', example: '081234567890' },
        email: { type: 'string', example: 'budi@example.com' },
        alamat: { type: 'string', example: 'Jl. Merdeka No. 123, Jakarta' },
        cv: { type: 'string', format: 'binary' },
      },
      required: ['tanggal', 'nama', 'no_hp', 'email', 'alamat', 'cv'],
    },
  })
  create(@Body() dto: RequestUserCareerCreateDto, @UploadedFile() cv?: StoredFile) {
    if (!cv) {
      throw new BadRequestException('CV file is required');
    }

    // Validate file is PDF
    if (cv.mimetype !== 'application/pdf') {
      throw new BadRequestException('CV file must be a PDF');
    }

    const payload: RequestUserCareerCreateDto = {
      ...dto,
      cv_link: `/uploads/${cv.filename}`,
    };

    return this.service.create(payload);
  }

  @Get()
  findAll(@Query() query: UserCareerListQueryDto) {
    const page = Math.max(1, parseInt(query.page ?? '1', 10) || 1);
    const limitRaw = parseInt(query.limit ?? '10', 10) || 10;
    const limit = Math.min(Math.max(1, limitRaw), 100);
    let startDate = query.startDate ? new Date(query.startDate) : undefined;
    let endDate = query.endDate ? new Date(query.endDate) : undefined;

    if (startDate && Number.isNaN(startDate.getTime())) {
      throw new BadRequestException('Invalid startDate');
    }

    if (endDate && Number.isNaN(endDate.getTime())) {
      throw new BadRequestException('Invalid endDate');
    }

    if (startDate && !query.startDate?.includes('T')) {
      startDate.setUTCHours(0, 0, 0, 0);
    }

    if (endDate && !query.endDate?.includes('T')) {
      endDate.setUTCHours(23, 59, 59, 999);
    }

    if (startDate && endDate && startDate > endDate) {
      throw new BadRequestException(
        'startDate must be before or equal to endDate',
      );
    }

    return this.service.findAll({ page, limit, startDate, endDate });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('cv', { storage: uploadDiskStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        tanggal: { type: 'string', example: '2024-05-20' },
        nama: { type: 'string', example: 'Budi Santoso' },
        no_hp: { type: 'string', example: '081234567890' },
        email: { type: 'string', example: 'budi@example.com' },
        alamat: { type: 'string', example: 'Jl. Merdeka No. 123, Jakarta' },
        cv: { type: 'string', format: 'binary' },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() dto: RequestUserCareerUpdateDto,
    @UploadedFile() cv?: StoredFile,
  ) {
    // Validate file is PDF if uploaded
    if (cv && cv.mimetype !== 'application/pdf') {
      throw new BadRequestException('CV file must be a PDF');
    }

    const payload: RequestUserCareerUpdateDto = {
      ...dto,
      ...(cv ? { cv_link: `/uploads/${cv.filename}` } : {}),
    };

    return this.service.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
