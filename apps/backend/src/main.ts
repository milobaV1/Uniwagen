/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('CampusCart APIs')
  .setDescription('CampusCart is a PWA for students at PAU to buy and sell items within the campus. It offers a simple, secure platform for one-time sales, with a user-friendly interface that works seamlessly on mobile and desktop. Connect, list, and sell items easily!')
  .setVersion('1.0')
  .addServer('http://localhost:3001', 'Local Server')
  .build();

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
