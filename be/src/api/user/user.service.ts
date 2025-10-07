import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import {
  RequestUseCreateDto,
} from '@/api/user/dto/requests/create.dto';
import { RequestUserUpdateDto } from '@/api/user/dto/requests/update.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: RequestUseCreateDto ) {
    const existingEmail = await this.prisma.user.findFirst({
      where: { email: dto.email },
    })

    if (existingEmail) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    const password = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        email: dto.email,
        nama: dto.nama,
        password: password,
      }
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, dto: RequestUserUpdateDto) {
    const existing = await this.prisma.user.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('User not found');
    }

    if (dto.email && dto.email !== existing.email) {
      const emailTaken = await this.prisma.user.findFirst({ where: { email: dto.email } });
      if (emailTaken) {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }
    }

    let password: string | undefined = undefined;
    if (dto.password) {
      password = await bcrypt.hash(dto.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        email: dto.email ?? undefined,
        nama: dto.nama ?? undefined,
        password: password ?? undefined,
      },
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.user.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('User not found');
    }
    await this.prisma.user.delete({ where: { id } });
    return { success: true };
  }
}
