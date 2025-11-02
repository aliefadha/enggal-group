import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OutletController } from 'src/api/outlet/outlet.controller';
import { OutletService } from 'src/api/outlet/outlet.service';

@Module({
  imports: [PrismaModule],
  controllers: [OutletController],
  providers: [OutletService],
})
export class OutletModule {}
