import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { RequestBrandCreateDto } from '@/api/brand/dto/requests/create.dto';
import { RequestBrandUpdateDto } from '@/api/brand/dto/requests/update.dto';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async create(dto: RequestBrandCreateDto) {
    if (!dto.logo) {
      throw new BadRequestException('Logo is required');
    }

    return this.prisma.brand.create({
      data: {
        nama: dto.nama,
        logo: dto.logo,
        description: dto.description,
      },
    });
  }

  async findAll({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
    const skip = (page - 1) * limit;
    const [total, data] = await this.prisma.$transaction([
      this.prisma.brand.count(),
      this.prisma.brand.findMany({
        skip,
        take: limit,
        orderBy: { nama: 'asc' },
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
    const brand = await this.prisma.brand.findUnique({ where: { id } });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return brand;
  }

  async update(id: string, dto: RequestBrandUpdateDto) {
    const existing = await this.prisma.brand.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Brand not found');
    }

    return this.prisma.brand.update({
      where: { id },
      data: {
        nama: dto.nama ?? undefined,
        logo: dto.logo ?? undefined,
        description: dto.description ?? undefined,
      },
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.brand.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Brand not found');
    }
    await this.prisma.brand.delete({ where: { id } });
    return { success: true };
  }
}
