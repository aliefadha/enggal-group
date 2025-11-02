import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestGalleryCreateDto } from './dto/requests/create.dto';
import { RequestGalleryUpdateDto } from './dto/requests/update.dto';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  async create(dto: RequestGalleryCreateDto) {
    // Verify brand exists
    const brand = await this.prisma.brand.findUnique({
      where: { id: dto.brandId },
    });
    if (!brand) {
      throw new BadRequestException('Brand not found');
    }

    return this.prisma.gallery.create({
      data: {
        brandId: dto.brandId,
        image: dto.image,
        caption: dto.caption,
        instagramUrl: dto.instagramUrl,
      },
      include: {
        brand: {
          select: {
            id: true,
            nama: true,
          },
        },
      },
    });
  }

  async findAll({
    brandId,
    page = 1,
    limit = 10,
  }: {
    brandId?: string;
    page?: number;
    limit?: number;
  }) {
    const skip = (page - 1) * limit;
    const where = brandId ? { brandId } : {};

    const [total, data] = await this.prisma.$transaction([
      this.prisma.gallery.count({ where }),
      this.prisma.gallery.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          brand: {
            select: {
              id: true,
              nama: true,
            },
          },
        },
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
    const gallery = await this.prisma.gallery.findUnique({
      where: { id },
      include: {
        brand: {
          select: {
            id: true,
            nama: true,
          },
        },
      },
    });
    if (!gallery) {
      throw new NotFoundException('Gallery item not found');
    }
    return gallery;
  }

  async update(id: string, dto: RequestGalleryUpdateDto) {
    const existing = await this.prisma.gallery.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Gallery item not found');
    }

    return this.prisma.gallery.update({
      where: { id },
      data: {
        image: dto.image ?? undefined,
        caption: dto.caption ?? undefined,
        instagramUrl: dto.instagramUrl ?? undefined,
      },
      include: {
        brand: {
          select: {
            id: true,
            nama: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.gallery.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Gallery item not found');
    }
    await this.prisma.gallery.delete({ where: { id } });
    return { success: true };
  }
}
