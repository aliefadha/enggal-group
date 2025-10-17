import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { OutletController } from '@/api/outlet/outlet.controller';
import { OutletService } from '@/api/outlet/outlet.service';

@Module({
  imports: [PrismaModule],
  controllers: [OutletController],
  providers: [OutletService],
})
export class OutletModule {}
