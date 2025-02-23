import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth') // Base route for authentication endpoints
export class AuthController {
  constructor(private authService: AuthService) {}

  // Register Endpoint - Creates a new user
  @Post('register')
  async register(
    @Body('username') username: string,  // Get username from request body
    @Body('password') password: string,  // Get password from request body
  ) {
    await this.authService.register(username, password); // Calls the AuthService to create a user
    return { message: 'User registered!' };  
  }

  // Login Endpoint - Authenticates user and returns JWT token
  @Post('login')
  async login(
    @Body('username') username: string,  // Get username from request body
    @Body('password') password: string,  // Get password from request body
  ) {
    // Calls the AuthService to validate user and get the JWT token
    const { accessToken } = await this.authService.login(
      username,
      password,
    );
    return { accessToken };  // Returns the JWT token to the client
  }

  // Used to test if JWT token authentication and backend connection work correctly
  @UseGuards(JwtAuthGuard)  // Uses JwtAuthGuard to protect this route
  @Get('profile')
  getProfile(@Request() req) {
      // Destructure to remove password before returning the user object
      const { password, ...userWithoutPassword } = req.user;
      return userWithoutPassword;  // Returns user details without the password
    }
}
