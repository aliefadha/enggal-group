import { Module } from '@nestjs/common';
import { BrandController } from '@/api/brand/brand.controller';
import { BrandService } from '@/api/brand/brand.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
