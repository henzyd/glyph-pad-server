import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { transformValidationErrors } from './common/utils/validation-util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors) => {
        return new BadRequestException(transformValidationErrors(errors));
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
