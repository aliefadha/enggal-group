import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TeamService } from '@/api/team/team.service';
import { RequestTeamCreateDto } from '@/api/team/dto/requests/create.dto';
import { RequestTeamUpdateDto } from '@/api/team/dto/requests/update.dto';
import { TeamListQueryDto } from '@/api/team/dto/requests/list.query.dto';

@ApiTags('team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@Body() dto: RequestTeamCreateDto) {
    return this.teamService.create(dto);
  }

  @Get()
  findAll(@Query() query: TeamListQueryDto) {
    const page = Math.max(1, parseInt(query.page ?? '1', 10) || 1);
    const limitRaw = parseInt(query.limit ?? '10', 10) || 10;
    const limit = Math.min(Math.max(1, limitRaw), 100);

    return this.teamService.findAll({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: RequestTeamUpdateDto) {
    return this.teamService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(id);
  }
}
