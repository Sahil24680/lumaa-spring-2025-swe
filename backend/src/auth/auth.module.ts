import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // Loads environment variables from .env file
    ConfigModule.forRoot({
      isGlobal: true, // Makes .env variables available everywhere
    }),

    // Connects User entity for database operations
    TypeOrmModule.forFeature([User]),

    // Sets up Passport with JWT strategy
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // Sets up JwtModule with secret from .env file
    JwtModule.registerAsync({
      imports: [ConfigModule], // Loads config module to access .env
      useFactory: (configService: ConfigService) => ({
        // Gets JWT secret from .env
        secret: configService.get<string>('JWT_SECRET'),
        // Sets token expiration to 1 hour
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService], // Injects ConfigService for .env access
    }),
  ],

  // Manages authentication routes like /auth/register and /auth/login
  controllers: [AuthController],

  // Manages authentication logic and token validation
  providers: [
    AuthService,   // Handles registration and login logic
    JwtStrategy,   // Checks validity of JWT tokens
  ],

  // Makes services available for other modules
  exports: [
    AuthService,   // Exports AuthService for use in other modules
    JwtStrategy,   // Exports JwtStrategy globally
    PassportModule, // Makes PassportModule globally available
  ],
})
export class AuthModule {}
