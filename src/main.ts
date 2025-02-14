import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const port = new ConfigService().get('PORT');
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET, POST, PUT, DELETE',
  });
  //app.setGlobalPrefix('mike-ross');
  await app.listen(port);
  console.log(`Server is running on port ${port}`);
}
bootstrap();
