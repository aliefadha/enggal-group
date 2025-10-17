import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { TeamController } from '@/api/team/team.controller';
import { TeamService } from '@/api/team/team.service';

@Module({
  imports: [PrismaModule],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
