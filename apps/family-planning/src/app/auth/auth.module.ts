import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { ConfigService } from '@nestjs/config';
import { Issuer } from 'openid-client';
import { AuthService } from './services/auth.service';
import { delay, lastValueFrom, of } from 'rxjs';
import { CreateNewUserCommandHandler, UserCreationService } from '@family-planning/application';
import { KeycloakUserCreationService } from './services/keycloak-user-creation.service';
import { EventBus } from '@family-planning/domain';
import { EventBus as NestEventBus } from '@nestjs/cqrs/dist/event-bus';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [
    { provide: 'KEYCLOAK_ISSUER',
      useFactory: async (configService: ConfigService) => {
        if (configService.get('APP_ENV') === 'production') {
          await lastValueFrom(of(true).pipe(delay(30000)));
        } // make sure Keycloak available
        return await Issuer.discover(configService.get('KEYCLOAK_ISSUER'));
      },
      inject: [ConfigService]
    },
    AuthService,
    {
      provide: UserCreationService,
      useClass: KeycloakUserCreationService,
    },
    {
      provide: EventBus,
      useExisting: NestEventBus
    },
    CreateNewUserCommandHandler,
  ]
})
export class AuthModule {}
