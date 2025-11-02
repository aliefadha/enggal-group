import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RequestLoginDto } from './dto/requests/login.dto';
import { JwtAuthGuard } from './guard/jwt-guard.auth';
import { Request } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('login')
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
          example: 'password123',
        },
      },
      required: ['email', 'password'],
    },
  })
  async login(@Body() req: RequestLoginDto) {
    return await this.authService.login(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate-token')
  async validateToken(@Req() req: Request) {
    const user = req.user; // populated by JwtStrategy
    return {
      valid: true,
      user,
    };
  }
}
