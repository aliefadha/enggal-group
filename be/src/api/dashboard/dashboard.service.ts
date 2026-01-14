import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getCounts() {
    const todayStart = new Date();
    todayStart.setUTCHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setUTCHours(23, 59, 59, 999);

    const [
      totalUserCareer,
      totalBrand,
      totalBerita,
      totalOutlet,
      totalMembership,
      todayNewMembers,
    ] = await this.prisma.$transaction([
      this.prisma.userCareer.count(),
      this.prisma.brand.count(),
      this.prisma.berita.count(),
      this.prisma.outlet.count(),
      this.prisma.membership.count(),
      this.prisma.membership.count({
        where: {
          createdAt: {
            gte: todayStart,
            lte: todayEnd,
          },
        },
      }),
    ]);

    return {
      totalUserCareer,
      totalBrand,
      totalBerita,
      totalOutlet,
      totalMembership,
      todayNewMembers,
    };
  }
}
