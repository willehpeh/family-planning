import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { TokenSet } from 'openid-client';
import { Request, Response } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    // this.setCorsHeaders(request, response);
    if (!request.cookies['access_token']) {
      response.redirect('/api/auth/login');
      return false;
    }
    const accessToken = request.cookies['access_token'];
    const refreshToken = request.cookies['refresh_token'];
    const isValid = await this.authService.validateToken(accessToken);
    if (!isValid.active) {
      response.redirect('/api/auth/login');
      return false;
    }
    try {
      const newTokens = await this.authService.refreshToken(refreshToken);
      this.setCookies(response, newTokens);
      return true;
    } catch {
      response.redirect('/api/auth/login');
      return false;
    }
  }

  private setCorsHeaders(request: Request, response: Response) {
    const origin = `http://${request.headers.host}`;
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
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
