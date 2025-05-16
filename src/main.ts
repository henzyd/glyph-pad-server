import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Glyph Pad')
    .setDescription('The Glyph Pad API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
