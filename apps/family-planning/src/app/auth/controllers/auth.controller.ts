import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { TokenSet } from 'openid-client';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {

  private readonly authUrl: string;

  constructor(private authService: AuthService,
              private configService: ConfigService) {
    this.authUrl = this.authService.authUrl();
  }

  @Get('userinfo')
  @UseGuards(AuthGuard)
  async userinfo(@Req() req: Request) {
    return this.authService.userInfo(req.cookies['access_token']);
  }

  @Get('callback')
  async callback(@Req() req: Request, @Res() res: Response) {
    const tokens = await this.authService.exchangeCodeForTokens(req);
    this.setTokenCookies(res, tokens).redirect(this.configService.get('FRONTEND_URL'));
  }

  @Get('login')
  async login(@Res() res: Response) {
    res.redirect(this.authUrl);
  }

  private setTokenCookies(res: Response, tokens: TokenSet) {
    res.cookie('access_token', tokens.access_token, {
      httpOnly: true,
      secure: this.configService.get('APP_ENV') === 'production',
      maxAge: 3600 * 1000,
    });
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: this.configService.get('APP_ENV') === 'production',
      maxAge: 7 * 24 * 3600 * 1000,
    });

    return res;
  }
}
