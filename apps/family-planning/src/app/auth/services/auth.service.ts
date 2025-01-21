import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { BaseClient, generators, Issuer, TokenSet, UserinfoResponse } from 'openid-client';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {

  private readonly client: BaseClient;
  private readonly code_verifier: string;
  private readonly code_challenge: string;
  private readonly authorizationUrl: string;

  constructor(private configService: ConfigService,
              @Inject('KEYCLOAK_ISSUER') private issuer: Issuer) {
    this.client = new this.issuer.Client({
      client_id: this.configService.get('KEYCLOAK_CLIENT_ID'),
      client_secret: this.configService.get('KEYCLOAK_CLIENT_SECRET'),
      redirect_uris: [`${this.configService.get('APP_URL')}/auth/callback`],
      response_types: ['code'],
    });
    this.code_verifier = generators.codeVerifier();
    this.code_challenge = generators.codeChallenge(this.code_verifier);
    this.authorizationUrl = this.client.authorizationUrl({
      scope: 'openid',
      code_challenge: this.code_challenge,
      code_challenge_method: 'S256',
    });
  }

  authUrl(): string {
    return this.authorizationUrl;
  }

  async logout(refreshToken: string): Promise<void> {
    return this.client.revoke(refreshToken, 'refresh_token');
  }

  async exchangeCodeForTokens(request: Request): Promise<TokenSet> {
    return this.client.callback(`${this.configService.get('APP_URL')}/auth/callback`, request.query, { code_verifier: this.code_verifier });
  }

  async userInfo(token: string): Promise<UserinfoResponse> {
    return this.client.userinfo(token).catch((error) => {
      throw new UnauthorizedException(error);
    });
  }

  redirectToLogin(res: Response): void {
    res.redirect(this.authUrl());
  }

  async refreshToken(refreshToken: string): Promise<TokenSet> {
    return this.client.refresh(refreshToken);
  }

}
