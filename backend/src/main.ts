import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Active CORS pour accepter les requêtes depuis le frontend
  app.enableCors({
    origin: '*', // adapte si ton frontend tourne ailleurs
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // ✅ Active les validations (via class-validator dans tes DTOs)
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
