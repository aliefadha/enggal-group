import { Injectable, NotFoundException } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestBeritaCreateDto } from 'src/api/berita/dto/requests/create.dto';
import { RequestBeritaUpdateDto } from 'src/api/berita/dto/requests/update.dto';

@Injectable()
export class BeritaService {
  constructor(private prisma: PrismaService) { }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async create(dto: RequestBeritaCreateDto) {
    const slug = this.generateSlug(dto.judul);

    return this.prisma.berita.create({
      data: {
        judul: dto.judul,
        slug,
        image: dto.image ?? undefined,
        createdDate: new Date(dto.createdDate),
        penulis: dto.penulis,
        content: dto.content,
      },
    });
  }

  async findAll({
    page = 1,
    limit = 10,
    startDate,
    endDate,
  }: {
    page?: number;
    limit?: number;
    startDate?: Date;
    endDate?: Date;
  }) {
    const skip = (page - 1) * limit;
    const where: Prisma.BeritaWhereInput = {};

    if (startDate || endDate) {
      where.createdDate = {};
      if (startDate) {
        where.createdDate.gte = startDate;
      }
      if (endDate) {
        where.createdDate.lte = endDate;
      }
    }

    const [total, data] = await this.prisma.$transaction([
      this.prisma.berita.count({ where }),
      this.prisma.berita.findMany({
        skip,
        take: limit,
        orderBy: { createdDate: 'desc' },
        where,
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

  async findOne(slug: string) {
    const berita = await this.prisma.berita.findUnique({ where: { slug } });
    if (!berita) {
      throw new NotFoundException('Berita not found');
    }
    return berita;
  }

  async update(slug: string, dto: RequestBeritaUpdateDto) {
    const existing = await this.prisma.berita.findUnique({ where: { slug: slug } });
    if (!existing) {
      throw new NotFoundException('Berita not found');
    }

    return this.prisma.berita.update({
      where: { slug },
      data: {
        judul: dto.judul ?? undefined,
        image: dto.image ?? undefined,
        createdDate: dto.createdDate ? new Date(dto.createdDate) : undefined,
        penulis: dto.penulis ?? undefined,
        content: dto.content ?? undefined,
      },
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.berita.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Berita not found');
    }
    await this.prisma.berita.delete({ where: { id } });
    return { success: true };
  }
}
