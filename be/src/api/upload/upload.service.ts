import { Injectable, NotFoundException } from '@nestjs/common';
import { existsSync, mkdirSync } from 'node:fs';
import { basename, join } from 'node:path';
import { UPLOAD_DIR } from 'src/api/upload/upload.constants';
import type { StoredFile } from 'src/api/upload/upload.types';

@Injectable()
export class UploadService {
  readonly uploadDir = UPLOAD_DIR;

  constructor() {
    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  buildFileResponse(file: StoredFile) {
    return {
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      path: `/uploads/${file.filename}`,
    };
  }

  resolveFilePath(filename: string) {
    const safeName = basename(filename);
    const filePath = join(this.uploadDir, safeName);
    if (!existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }
    return filePath;
  }
}
