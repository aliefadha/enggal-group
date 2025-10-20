import { Module } from '@nestjs/common';
import { DashboardController } from '@/api/dashboard/dashboard.controller';
import { DashboardService } from '@/api/dashboard/dashboard.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
