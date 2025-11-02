import { Module } from '@nestjs/common';
import { UploadController } from 'src/api/upload/upload.controller';
import { UploadService } from 'src/api/upload/upload.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
