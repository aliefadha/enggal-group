import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { RequestPromoCreateDto } from '@/api/promo/dto/requests/create.dto';
import { RequestPromoUpdateDto } from '@/api/promo/dto/requests/update.dto';

@Injectable()
export class PromoService {
  constructor(private prisma: PrismaService) {}

  async create(dto: RequestPromoCreateDto) {
    if (!dto.brandId) {
      throw new BadRequestException('brandId is required');
    }

    const brand = await this.prisma.brand.findUnique({
      where: { id: dto.brandId },
    });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    if (!dto.image) {
      throw new BadRequestException('image is required');
    }

    return this.prisma.promo.create({
      data: {
        title: dto.title,
        subtitle: dto.subtitle,
        description: dto.description,
        syaratKetentuan: dto.syaratKetentuan,
        berlakuHingga: new Date(dto.berlakuHingga),
        brandId: dto.brandId,
        image: dto.image,
      },
      include: { brand: true },
    });
  }

  async findAll({
    page = 1,
    limit = 10,
    brandId,
    startDate,
    endDate,
  }: {
    page?: number;
    limit?: number;
    brandId?: string;
    startDate?: Date;
    endDate?: Date;
  }) {
    const skip = (page - 1) * limit;
    const where: Prisma.PromoWhereInput = {};

    if (brandId) {
      where.brandId = brandId;
    }

    if (startDate || endDate) {
      const berlakuHinggaFilter: Prisma.DateTimeFilter = {};
      if (startDate) {
        berlakuHinggaFilter.gte = startDate;
      }
      if (endDate) {
        berlakuHinggaFilter.lte = endDate;
      }
      where.berlakuHingga = berlakuHinggaFilter;
    }

    const [total, rows] = await this.prisma.$transaction([
      this.prisma.promo.count({ where }),
      this.prisma.promo.findMany({
        skip,
        take: limit,
        orderBy: { berlakuHingga: 'desc' },
        where,
        select: {
          id: true,
          title: true,
          berlakuHingga: true,
          brandId: true,
          brand: {
            select: { id: true, nama: true },
          },
        },
      }),
    ]);

    const data = rows.map(({ brand, ...rest }) => ({
      ...rest,
      namaBrand: brand?.nama ?? null,
    }));

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
    const promo = await this.prisma.promo.findUnique({
      where: { id },
      include: { brand: true },
    });
    if (!promo) {
      throw new NotFoundException('Promo not found');
    }
    return promo;
  }

  async update(id: string, dto: RequestPromoUpdateDto) {
    const existing = await this.prisma.promo.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Promo not found');
    }

    if (dto.brandId) {
      const brand = await this.prisma.brand.findUnique({
        where: { id: dto.brandId },
      });
      if (!brand) {
        throw new NotFoundException('Brand not found');
      }
    }

    return this.prisma.promo.update({
      where: { id },
      data: {
        title: dto.title ?? undefined,
        subtitle: dto.subtitle ?? undefined,
        description: dto.description ?? undefined,
        syaratKetentuan: dto.syaratKetentuan ?? undefined,
        berlakuHingga: dto.berlakuHingga
          ? new Date(dto.berlakuHingga)
          : undefined,
        brandId: dto.brandId ?? undefined,
        image: dto.image ?? undefined,
      },
      include: { brand: true },
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.promo.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Promo not found');
    }
    await this.prisma.promo.delete({ where: { id } });
    return { success: true };
  }
}
