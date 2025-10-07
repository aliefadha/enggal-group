import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { RequestUserCareerCreateDto } from '@/api/user-career/dto/requests/create.dto';
import { RequestUserCareerUpdateDto } from '@/api/user-career/dto/requests/update.dto';

@Injectable()
export class UserCareerService {
  constructor(private prisma: PrismaService) {}

  async create(dto: RequestUserCareerCreateDto) {
    return this.prisma.userCareer.create({
      data: {
        tanggal: new Date(dto.tanggal),
        nama: dto.nama,
        no_hp: dto.no_hp,
        email: dto.email,
        cv_link: dto.cv_link,
      },
    });
  }

  async findAll({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
    const skip = (page - 1) * limit;
    const [total, data] = await this.prisma.$transaction([
      this.prisma.userCareer.count(),
      this.prisma.userCareer.findMany({
        skip,
        take: limit,
        orderBy: { tanggal: 'desc' },
      }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };
  }

  async findOne(id: string) {
    const item = await this.prisma.userCareer.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException('UserCareer not found');
    }
    return item;
  }

  async update(id: string, dto: RequestUserCareerUpdateDto) {
    const existing = await this.prisma.userCareer.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('UserCareer not found');
    }

    return this.prisma.userCareer.update({
      where: { id },
      data: {
        tanggal: dto.tanggal ? new Date(dto.tanggal) : undefined,
        nama: dto.nama ?? undefined,
        no_hp: dto.no_hp ?? undefined,
        email: dto.email ?? undefined,
        cv_link: dto.cv_link ?? undefined,
      },
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.userCareer.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('UserCareer not found');
    }
    await this.prisma.userCareer.delete({ where: { id } });
    return { success: true };
  }
}
