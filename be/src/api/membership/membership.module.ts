import { Module } from '@nestjs/common';
import { MembershipController } from './membership.controller';
import { MembershipService } from './membership.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailModule } from 'src/common/email/email.module';
import { PdfModule } from 'src/common/pdf/pdf.module';
import { GoogleSheetsModule } from 'src/common/google-sheets/google-sheets.module';

@Module({
  imports: [PrismaModule, EmailModule, PdfModule, GoogleSheetsModule],
  controllers: [MembershipController],
  providers: [MembershipService],
})
export class MembershipModule {}
