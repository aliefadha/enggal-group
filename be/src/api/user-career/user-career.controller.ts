import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserCareerService } from './user-career.service';
import { RequestUserCareerCreateDto } from '@/api/user-career/dto/requests/create.dto';
import { RequestUserCareerUpdateDto } from '@/api/user-career/dto/requests/update.dto';
import { UserCareerListQueryDto } from '@/api/user-career/dto/requests/list.query.dto';

@ApiTags('user-career')
@Controller('user-career')
export class UserCareerController {
  constructor(private readonly service: UserCareerService) {}

  @Post()
  create(@Body() dto: RequestUserCareerCreateDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() query: UserCareerListQueryDto) {
    const page = Math.max(1, parseInt(query.page ?? '1', 10) || 1);
    const limitRaw = parseInt(query.limit ?? '10', 10) || 10;
    const limit = Math.min(Math.max(1, limitRaw), 100);
    let startDate = query.startDate ? new Date(query.startDate) : undefined;
    let endDate = query.endDate ? new Date(query.endDate) : undefined;

    if (startDate && Number.isNaN(startDate.getTime())) {
      throw new BadRequestException('Invalid startDate');
    }

    if (endDate && Number.isNaN(endDate.getTime())) {
      throw new BadRequestException('Invalid endDate');
    }

    if (startDate && !query.startDate?.includes('T')) {
      startDate.setUTCHours(0, 0, 0, 0);
    }

    if (endDate && !query.endDate?.includes('T')) {
      endDate.setUTCHours(23, 59, 59, 999);
    }

    if (startDate && endDate && startDate > endDate) {
      throw new BadRequestException(
        'startDate must be before or equal to endDate',
      );
    }

    return this.service.findAll({ page, limit, startDate, endDate });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: RequestUserCareerUpdateDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
