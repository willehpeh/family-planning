import { Module } from "@nestjs/common";
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { ConfigService } from '@nestjs/config';
import { Issuer } from 'openid-client';
import { AuthService } from './services/auth.service';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [
    { provide: 'KEYCLOAK_ISSUER',
      useFactory: async (configService: ConfigService) => await Issuer.discover(configService.get('KEYCLOAK_ISSUER')),
      inject: [ConfigService]
    },
    AuthService
  ]
})
export class AuthModule {}
