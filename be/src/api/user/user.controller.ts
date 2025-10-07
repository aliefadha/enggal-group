import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '@/api/user/user.service';
import { ApiTags } from '@nestjs/swagger';
import { RequestUseCreateDto } from '@/api/user/dto/requests/create.dto';
import { RequestUserUpdateDto } from '@/api/user/dto/requests/update.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() req : RequestUseCreateDto,
  ) {
    return await this.userService.create(req)
  }

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() req: RequestUserUpdateDto,
  ) {
    return this.userService.update(id, req)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id)
  }
}
