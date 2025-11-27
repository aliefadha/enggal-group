import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GoogleSheetsModule } from 'src/common/google-sheets/google-sheets.module';
import { GoogleDriveModule } from 'src/common/google-drive/google-drive.module';
import { UserCareerService } from './user-career.service';
import { UserCareerController } from './user-career.controller';

@Module({
  imports: [PrismaModule, GoogleSheetsModule, GoogleDriveModule],
  providers: [UserCareerService],
  controllers: [UserCareerController],
  exports: [UserCareerService],
})
export class UserCareerModule {}
