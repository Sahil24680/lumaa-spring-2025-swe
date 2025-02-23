import { Injectable } from '@nestjs/common';
import {
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  
  // Checks if the request is authorized using JWT
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Calls the parent class's canActivate method to perform JWT validation
    return super.canActivate(context);
  }
}
