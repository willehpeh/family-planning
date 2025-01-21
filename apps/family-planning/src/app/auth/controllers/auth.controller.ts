import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { TokenSet, UserinfoResponse } from 'openid-client';
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
  async userinfo(@Req() req: Request): Promise<UserinfoResponse> {
    return this.authService.userInfo(req.cookies['access_token']);
  }

  @Get('callback')
  async callback(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const tokens = await this.authService.exchangeCodeForTokens(req);
      this.setTokenCookies(res, tokens).redirect(`${this.configService.get('FRONTEND_URL')}/command-centre`);
    } catch {
      res.redirect(this.authUrl);
    }
  }

  @Get('login')
  async login(@Res() res: Response) {
    res.redirect(this.authUrl);
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    this.clearTokenCookies(res);
    await this.authService.logout(req.cookies['refresh_token']);
    res.status(200).send();
  }

  private clearTokenCookies(res: Response): void {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
  }

  private setTokenCookies(res: Response, tokens: TokenSet): Response {
    this.setTokenCookie(res, tokens.access_token, 'access_token', 3600 * 1000);
    this.setTokenCookie(res, tokens.refresh_token, 'refresh_token', 7 * 24 * 3600 * 1000);

    return res;
  }

  private setTokenCookie(res: Response, token: string, cookieName: string, maxAge: number): Response {
    res.cookie(cookieName, token, {
      httpOnly: true,
      secure: this.configService.get('APP_ENV') === 'production',
      maxAge,
    });

    return res;
  }
}
