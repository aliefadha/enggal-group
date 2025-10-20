import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getCounts() {
    const [totalUserCareer, totalBrand, totalBerita, totalOutlet] =
      await this.prisma.$transaction([
        this.prisma.userCareer.count(),
        this.prisma.brand.count(),
        this.prisma.berita.count(),
        this.prisma.outlet.count(),
      ]);

    return {
      totalUserCareer,
      totalBrand,
      totalBerita,
      totalOutlet,
    };
  }
}
