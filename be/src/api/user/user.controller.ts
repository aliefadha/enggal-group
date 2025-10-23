import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '@/api/user/user.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RequestUserCreateDto } from './dto/requests/create.dto';
import { RequestUserUpdateDto } from './dto/requests/update.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
          example: 'user@example.com',
        },
        password: {
          type: 'string',
          example: 'Str0ngP@ssword!',
        },
        nama: { type: 'string', example: 'Jane Doe' },
      },
      required: ['email', 'password', 'nama'],
    },
  })
  async create(@Body() req: RequestUserCreateDto) {
    return await this.userService.create(req);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
          example: 'user@example.com',
        },
        password: {
          type: 'string',
          example: 'Str0ngP@ssword!',
        },
        nama: { type: 'string', example: 'Jane Doe' },
      },
    },
  })
  update(@Param('id') id: string, @Body() req: RequestUserUpdateDto) {
    return this.userService.update(id, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
