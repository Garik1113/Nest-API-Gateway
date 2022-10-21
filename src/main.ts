require('dotenv');
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.useGlobalPipes(new ValidationPipe());
  await app.listen(Number(process.env.PORT));
  console.log('Api Gateway started on port', Number(process.env.PORT));
}

bootstrap();
