import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestLoginDto } from './dto/requests/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private usersService: UserService,
  ) {}

  async login(dto: RequestLoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new ConflictException('Invalid credentials');
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new ConflictException('Invalid credentials');
    const payload = {
      email: user.email,
      nama: user.nama,
      sub: user.id,
    };
    const authToken = this.jwtService.sign(payload);

    return {
      auth_token: authToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.nama,
      },
    };
  }

  async validateUserById(userId: string) {
    return this.usersService.findOne(userId);
  }
}
