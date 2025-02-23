import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Create the NestJS application using the main module
  const app = await NestFactory.create(AppModule);

  // Enable CORS to allow frontend requests from React running on port 5173
  app.enableCors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true, // Allow cookies and other credentials
  });

  // Get the port from the .env file using ConfigService
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5001;

  // Start the server on the specified port
  await app.listen(port);
  console.log(`🚀 Server is running on http://localhost:${port}`);
}

// Run the application
bootstrap();
