import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { TeamService } from '@/api/team/team.service';
import { RequestTeamCreateDto } from '@/api/team/dto/requests/create.dto';
import { RequestTeamUpdateDto } from '@/api/team/dto/requests/update.dto';
import { TeamListQueryDto } from '@/api/team/dto/requests/list.query.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-guard.auth';

@ApiTags('team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: { type: 'string', example: '/uploads/team-john-doe.png' },
        nama: { type: 'string', example: 'John Doe' },
        title: { type: 'string', example: 'Chief Executive Officer' },
        linkedinUrl: {
          type: 'string',
          example: 'https://www.linkedin.com/in/john-doe',
        },
        instagramUrl: {
          type: 'string',
          example: 'https://www.instagram.com/johndoe',
        },
      },
      required: ['image', 'nama', 'title', 'linkedinUrl', 'instagramUrl'],
    },
  })
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
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: { type: 'string', example: '/uploads/team-john-doe.png' },
        nama: { type: 'string', example: 'John Doe' },
        title: { type: 'string', example: 'Chief Executive Officer' },
        linkedinUrl: {
          type: 'string',
          example: 'https://www.linkedin.com/in/john-doe',
        },
        instagramUrl: {
          type: 'string',
          example: 'https://www.instagram.com/johndoe',
        },
      },
    },
  })
  update(@Param('id') id: string, @Body() dto: RequestTeamUpdateDto) {
    return this.teamService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.teamService.remove(id);
  }
}
