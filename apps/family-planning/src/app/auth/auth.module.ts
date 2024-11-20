import { Module } from "@nestjs/common";
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { ConfigService } from '@nestjs/config';
import { Issuer } from 'openid-client';
import { AuthService } from './services/auth.service';
import { delay, lastValueFrom, of } from 'rxjs';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [
    { provide: 'KEYCLOAK_ISSUER',
      useFactory: async (configService: ConfigService) => {
        await lastValueFrom(of(true).pipe(delay(30000)));
        return await Issuer.discover(configService.get('KEYCLOAK_ISSUER'));
      },
      inject: [ConfigService]
    },
    AuthService,
  ]
})
export class AuthModule {}
