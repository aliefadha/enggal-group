import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { RequestOutletCreateDto } from '@/api/outlet/dto/requests/create.dto';
import { RequestOutletUpdateDto } from '@/api/outlet/dto/requests/update.dto';

@Injectable()
export class OutletService {
  constructor(private prisma: PrismaService) { }

  async create(dto: RequestOutletCreateDto) {
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

    if (!dto.googleMapsLink) {
      throw new BadRequestException('googleMapsLink is required');
    }

    return this.prisma.outlet.create({
      data: {
        brandId: dto.brandId,
        nama: dto.nama,
        kota: dto.kota,
        jamOperasional: dto.jamOperasional,
        lokasi: dto.lokasi,
        image: dto.image,
        googleMapsLink: dto.googleMapsLink,
        whatsappUrl: dto.whatsappUrl ?? null,
      },
      include: { brand: true },
    });
  }

  async findAll({
    page = 1,
    limit = 10,
    brandId,
  }: {
    page?: number;
    limit?: number;
    brandId?: string;
  }) {
    const skip = (page - 1) * limit;
    const where = brandId ? { brandId } : undefined;

    const [total, rows] = await this.prisma.$transaction([
      this.prisma.outlet.count({ where }),
      this.prisma.outlet.findMany({
        skip,
        take: limit,
        orderBy: { kota: 'asc' },
        where,
        include: { brand: { select: { id: true, nama: true } } },
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
    const outlet = await this.prisma.outlet.findUnique({
      where: { id },
      include: { brand: true },
    });
    if (!outlet) {
      throw new NotFoundException('Outlet not found');
    }
    return outlet;
  }

  async update(id: string, dto: RequestOutletUpdateDto) {
    const existing = await this.prisma.outlet.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Outlet not found');
    }

    if (dto.brandId) {
      const brand = await this.prisma.brand.findUnique({
        where: { id: dto.brandId },
      });
      if (!brand) {
        throw new NotFoundException('Brand not found');
      }
    }

    return this.prisma.outlet.update({
      where: { id },
      data: {
        nama: dto.nama ?? undefined,
        brandId: dto.brandId ?? undefined,
        kota: dto.kota ?? undefined,
        jamOperasional: dto.jamOperasional ?? undefined,
        lokasi: dto.lokasi ?? undefined,
        image: dto.image ?? undefined,
        googleMapsLink: dto.googleMapsLink ?? undefined,
        whatsappUrl: dto.whatsappUrl ?? undefined,
      },
      include: { brand: true },
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.outlet.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Outlet not found');
    }

    await this.prisma.outlet.delete({ where: { id } });
    return { success: true };
  }
}
