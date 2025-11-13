import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestTeamCreateDto } from 'src/api/team/dto/requests/create.dto';
import { RequestTeamUpdateDto } from 'src/api/team/dto/requests/update.dto';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  create(dto: RequestTeamCreateDto) {
    return this.prisma.team.create({
      data: {
        image: dto.image,
        nama: dto.nama,
        title: dto.title,
        linkedinUrl: dto.linkedinUrl || '',
        instagramUrl: dto.instagramUrl || '',
      },
    });
  }

  async findAll({ page = 1, limit = 10 }: { page?: number; limit?: number }) {
    const skip = (page - 1) * limit;

    const [total, data] = await this.prisma.$transaction([
      this.prisma.team.count(),
      this.prisma.team.findMany({
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
    const team = await this.prisma.team.findUnique({ where: { id } });
    if (!team) {
      throw new NotFoundException('Team member not found');
    }
    return team;
  }

  async update(id: string, dto: RequestTeamUpdateDto) {
    const existing = await this.prisma.team.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Team member not found');
    }

    return this.prisma.team.update({
      where: { id },
      data: {
        image: dto.image ?? undefined,
        nama: dto.nama ?? undefined,
        title: dto.title ?? undefined,
        linkedinUrl: dto.linkedinUrl ?? undefined,
        instagramUrl: dto.instagramUrl ?? undefined,
      },
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.team.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Team member not found');
    }

    await this.prisma.team.delete({ where: { id } });
    return { success: true };
  }
}
