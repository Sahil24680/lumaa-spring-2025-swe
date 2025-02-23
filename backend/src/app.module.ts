import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './tasks/task.module';

@Module({
  imports: [
   
    ConfigModule.forRoot({
      isGlobal: true, // Makes environment variables available across the app
    }),

    // Configure and connect to PostgreSQL database using TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to access environment variables
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // Database type
        host: configService.get('DB_HOST'), // Database host
        port: parseInt(configService.get<string>('DB_PORT', '5432')), // Database port
        username: configService.get('DB_USERNAME'), // Database username
        password: configService.get('DB_PASSWORD'), // Database password
        database: configService.get('DB_NAME'), // Database name
        autoLoadEntities: true, // Automatically load entities
        synchronize: true, 
        logging: true, // Enable query logging
      }),
      inject: [ConfigService], // Inject ConfigService to access environment variables
    }),

    // Import authentication and task management modules
    AuthModule, // Handles user authentication and authorization
    TaskModule, // Manages tasks (CRUD operations)
  ],
  controllers: [AppController], // Register the main controller
})
export class AppModule {}
