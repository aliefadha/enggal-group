import { Module } from '@nestjs/common';
import { BeritaController } from '@/api/berita/berita.controller';
import { BeritaService } from '@/api/berita/berita.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BeritaController],
  providers: [BeritaService],
})
export class BeritaModule {}
