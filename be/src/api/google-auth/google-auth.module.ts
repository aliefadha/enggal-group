import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleAuthController } from './google-auth.controller';

@Module({
  imports: [ConfigModule],
  controllers: [GoogleAuthController],
})
export class GoogleAuthModule {}
