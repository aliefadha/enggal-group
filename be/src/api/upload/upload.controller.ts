import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadService } from 'src/api/upload/upload.service';
import { Response } from 'express';
import type { StoredFile } from 'src/api/upload/upload.types';
import { uploadDiskStorage } from 'src/api/upload/upload.storage';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: uploadDiskStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  upload(@UploadedFile() file: StoredFile) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.uploadService.buildFileResponse(file);
  }

  @Get(':filename')
  serve(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = this.uploadService.resolveFilePath(filename);
    res.sendFile(filePath);
  }
}
