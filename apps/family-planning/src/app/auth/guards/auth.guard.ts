import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { TokenSet } from 'openid-client';
import { Response } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    if (!request.cookies['access_token']) {
      response.redirect('/api/auth/login');
      return false;
    }
    const token = request.cookies['access_token'];
    console.time('validateToken');
    const isValid = await this.authService.validateToken(token);
    console.timeEnd('validateToken');
    if (!isValid.active) {
      throw new UnauthorizedException('Invalid token');
    }
    try {
      console.time('refreshToken');
      const newTokens = await this.authService.refreshToken(token);
      console.timeEnd('refreshToken');
      this.setCookies(response, newTokens);
      return true;
    } catch {
      response.redirect('/api/auth/login');
      return false;
    }
  }

  private setCookies(response: Response, newTokens: TokenSet) {
    response.cookie('access_token', newTokens.access_token, {
      httpOnly: true,
      secure: process.env.APP_ENV === 'production',
      maxAge: 3600 * 1000,
    });
    response.cookie('refresh_token', newTokens.refresh_token, {
      httpOnly: true,
      secure: process.env.APP_ENV === 'production',
      maxAge: 7 * 24 * 3600 * 1000,
    });
  }
}
