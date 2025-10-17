import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'node:fs';
import { extname } from 'node:path';
import { randomUUID } from 'node:crypto';
import { UPLOAD_DIR } from '@/api/upload/upload.constants';

export const uploadDiskStorage = diskStorage({
  destination: (req, file, cb) => {
    if (!existsSync(UPLOAD_DIR)) {
      mkdirSync(UPLOAD_DIR, { recursive: true });
    }
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const extension = extname(file.originalname);
    cb(null, `${randomUUID()}${extension}`);
  },
});
