import { NestFactory } from '@nestjs/core';
import { AppModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do CORS usando a configuração embutida do NestJS
  app.enableCors();

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

bootstrap();
