import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from 'src/logging/logging.interceptor';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './api/user/user.module';
import { UserCareerModule } from './api/user-career/user-career.module';
import { PromoModule } from './api/promo/promo.module';
import { BrandModule } from './api/brand/brand.module';
import { OutletModule } from './api/outlet/outlet.module';
import { TeamModule } from './api/team/team.module';
import { UploadModule } from './api/upload/upload.module';
import { BeritaModule } from './api/berita/berita.module';
import { DashboardModule } from './api/dashboard/dashboard.module';
import { AuthModule } from './api/auth/auth.module';
import { GalleryModule } from './api/gallery/gallery.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    UserCareerModule,
    PromoModule,
    BrandModule,
    OutletModule,
    TeamModule,
    UploadModule,
    BeritaModule,
    DashboardModule,
    AuthModule,
    GalleryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
