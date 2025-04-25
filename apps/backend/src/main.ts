/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './core/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1');
  const uploadDir = join(process.cwd(), 'uploads');
  if (!existsSync(uploadDir)) mkdirSync(uploadDir);
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));
  const config = new DocumentBuilder()
    .setTitle('UNKNOWN APIs')
    .setDescription(
      'UNKNOWN is a PWA for students at PAU to buy and sell items within the campus. It offers a simple, secure platform for one-time sales, with a user-friendly interface that works seamlessly on mobile and desktop. Connect, list, and sell items easily!',
    )
    .setVersion('1.0')
    .addServer('http://localhost:3001', 'Local Server')
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);

  // const listener = await ngrok.forward({
  //   addr: 3001,
  //   authtoken_from_env: true,
  // });
  // console.log(`Ingress established at: ${listener.url()}`);
}
bootstrap();
