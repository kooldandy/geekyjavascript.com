import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as compression from 'compression';
import helmet from 'helmet';
import { SwaggerConfig } from './modules/swagger/swagger.module';

async function bootstrap() {
  // Create logger instance
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(AppModule);
    
    // Security middlewares
    app.use(helmet({
      contentSecurityPolicy: process.env.NODE_ENV === 'production',
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'production',
    }));
    
    app.use(compression());
    
    // CORS configuration
    app.enableCors({
      origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

    // Validation configuration
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
        disableErrorMessages: process.env.NODE_ENV === 'production',
      }),
    );

    // Use Winston logger
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

    // Setup Swagger (only in non-production)
    if (process.env.NODE_ENV !== 'production') {
      SwaggerConfig.setup(app);
    }

    const port = process.env.PORT || 3000;
    await app.listen(port);
    logger.log(`Application is running on port ${port}`);
    logger.log(`Environment: ${process.env.NODE_ENV}`);
  } catch (error) {
    logger.error(`Error starting application: ${error.message}`);
    process.exit(1);
  }
}

bootstrap();