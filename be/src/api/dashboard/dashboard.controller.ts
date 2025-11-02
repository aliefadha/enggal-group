import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DashboardService } from 'src/api/dashboard/dashboard.service';
import { JwtAuthGuard } from '../auth/guard/jwt-guard.auth';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getCounts() {
    return this.dashboardService.getCounts();
  }
}
