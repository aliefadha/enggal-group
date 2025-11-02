import { Module } from '@nestjs/common';
import { PromoController } from 'src/api/promo/promo.controller';
import { PromoService } from 'src/api/promo/promo.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PromoController],
  providers: [PromoService],
})
export class PromoModule {}
