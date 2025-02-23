import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
// Custom strategy for validating JWTs
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // Access to environment variables
    private configService: ConfigService,
    // Connects User entity to perform database operations
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    // Configure the JWT strategy
    super({
      // Extracts JWT from Authorization header as Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Does not allow expired tokens
      ignoreExpiration: false,
      // Get secret key from environment or use a default one
      secretOrKey: configService.get<string>('JWT_SECRET') as string,
    });
  }

  // Validates the JWT payload
  async validate(payload: any) {
    // Extract username from the token payload
    const { username } = payload;
    // Find the user in the database by username
    const user = await this.userRepository.findOne({ where: { username } });

    // If no user is found, throw an UnauthorizedException
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Return the user object to be available in the request object
    return user;
  }
}
