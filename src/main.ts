import { NestFactory } from '@nestjs/core';
import { AppModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do CORS usando a configuração embutida do NestJS
  app.enableCors({
    origin: 'http://127.0.0.1:5500', // Permite apenas essa origem
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  });

  const PORT = 3000;
  await app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

bootstrap();
