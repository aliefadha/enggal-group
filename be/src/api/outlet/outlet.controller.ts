import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OutletService } from '@/api/outlet/outlet.service';
import { RequestOutletCreateDto } from '@/api/outlet/dto/requests/create.dto';
import { RequestOutletUpdateDto } from '@/api/outlet/dto/requests/update.dto';
import { OutletListQueryDto } from '@/api/outlet/dto/requests/list.query.dto';

@ApiTags('outlet')
@Controller('outlet')
export class OutletController {
  constructor(private readonly outletService: OutletService) {}

  @Post()
  create(@Body() dto: RequestOutletCreateDto) {
    return this.outletService.create(dto);
  }

  @Get()
  findAll(@Query() query: OutletListQueryDto) {
    const page = Math.max(1, parseInt(query.page ?? '1', 10) || 1);
    const limitRaw = parseInt(query.limit ?? '10', 10) || 10;
    const limit = Math.min(Math.max(1, limitRaw), 100);

    return this.outletService.findAll({
      page,
      limit,
      brandId: query.brandId,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.outletService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: RequestOutletUpdateDto) {
    return this.outletService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.outletService.remove(id);
  }
}
