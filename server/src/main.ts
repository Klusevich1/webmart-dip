import { NestFactory } from '@nestjs/core';
import { ValidationPipe, ValidationError, BadRequestException } from '@nestjs/common';
import { AppModule } from './app.module';
import { ServicesService } from './modules/services/services.service';
import { BlogService } from './modules/blog/blog.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (errors: ValidationError[]) => {
      console.error('Validation errors:', errors);
      return new BadRequestException({
        message: 'Validation failed',
        errors: errors.map(err => ({
          field: err.property,
          constraints: err.constraints,
        })),
      });
    },
  }));

  // Auto-seed database if empty (only in development or when explicitly requested)
  if (process.env.NODE_ENV === 'development' || process.env.AUTO_SEED === 'true') {
    try {
      const servicesService = app.get(ServicesService);
      await servicesService.seedData();
      const blogService = app.get(BlogService);
      await blogService.seedData();
      console.log('✅ Database seeded successfully');
    } catch (error) {
      console.error('❌ Error seeding database:', error);
    }
  }

  await app.listen(process.env.PORT || 3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
