import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    // Connects User entity to database for authentication
    @InjectRepository(User) private userRepository: Repository<User>,
    // Manages JSON Web Tokens
    private jwtService: JwtService
  ) {}

  // Registers a new user
  async register(username: string, password: string): Promise<void> {
    // Hashes the password for security
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creates a new user with the hashed password
    const user = this.userRepository.create({ username, password: hashedPassword });
    
    // Saves the new user in the database
    try {
      await this.userRepository.save(user);
    } catch (error) {
      // Throws an error if username is already taken
      throw new ConflictException('Username already exists');
    }
  }

  // Logs in user and generates JWT token
  async login(username: string, password: string): Promise<{ accessToken: string }> {
    // Finds the user by username
    const user = await this.userRepository.findOneBy({ username });

    // Checks if user exists and password is correct
    if (user && (await bcrypt.compare(password, user.password))) {
      // Creates a JWT payload with the username
      const payload = { username };

      // Generates an access token using the payload
      const accessToken = await this.jwtService.signAsync(payload);

      // Returns the generated access token
      return { accessToken };
    } else {
      // Throws error if username or password is incorrect
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
