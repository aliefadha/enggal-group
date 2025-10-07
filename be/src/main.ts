import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { writeFileSync } from 'node:fs'
import { apiReference } from '@scalar/nestjs-api-reference'
import { ValidationPipe } from '@nestjs/common'
import { LoggingInterceptor } from '@/logging/logging.interceptor'
import { TransformInterceptor } from '@/interceptors/transform.interceptor';
import { HttpExceptionFilter } from '@/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'Cache-Control',
      'Pragma',
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new LoggingInterceptor())

  const config = new DocumentBuilder()
    .setTitle('EnggalGroup API')
    .setDescription('The EnggalGroup API description')
    .setVersion('0.1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
      },
      'token',
    )
    .build()

  const document = SwaggerModule.createDocument(app, config)
  writeFileSync('./swagger-spec.json', JSON.stringify(document))
  SwaggerModule.setup('api', app, document)

  app.use(
    '/swagger',
    apiReference({
      metaData: {
        title: 'EnggalGroup | API Documentation',
      },
      content: document,
    }),
  )

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3003)
}

bootstrap()
