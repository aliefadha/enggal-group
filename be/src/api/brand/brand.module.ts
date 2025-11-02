import { Module } from '@nestjs/common';
import { BrandController } from 'src/api/brand/brand.controller';
import { BrandService } from 'src/api/brand/brand.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
