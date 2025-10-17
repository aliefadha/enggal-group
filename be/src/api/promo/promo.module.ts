import { Module } from '@nestjs/common';
import { PromoController } from '@/api/promo/promo.controller';
import { PromoService } from '@/api/promo/promo.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PromoController],
  providers: [PromoService],
})
export class PromoModule {}
