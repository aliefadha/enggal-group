import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { UserCareerService } from './user-career.service';
import { UserCareerController } from './user-career.controller';

@Module({
  imports: [PrismaModule],
  providers: [UserCareerService],
  controllers: [UserCareerController],
  exports: [UserCareerService],
})
export class UserCareerModule {}

