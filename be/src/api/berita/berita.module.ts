import { Module } from '@nestjs/common';
import { BeritaController } from 'src/api/berita/berita.controller';
import { BeritaService } from 'src/api/berita/berita.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BeritaController],
  providers: [BeritaService],
})
export class BeritaModule {}
