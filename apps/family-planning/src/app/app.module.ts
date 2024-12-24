import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListsModule } from './lists/lists.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from './auth/auth.module';
import { UserIdMiddleware } from './middleware/user-id.middleware';
import { HouseholdsModule } from './households/households.module';
import { EventBus } from '@family-planning/domain';
import { EventBus as NestEventBus } from '@nestjs/cqrs/dist/event-bus';
import { TenantMiddleware } from './middleware/tenant.middleware';

const isDevEnvironment = process.env.APP_ENV === "development";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: isDevEnvironment ? "127.0.0.1" : process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: isDevEnvironment ? "fp_api" : process.env.POSTGRES_USER,
      password: isDevEnvironment ? "fp_api" : process.env.POSTGRES_PASSWORD,
      database: isDevEnvironment ? "postgres" : process.env.POSTGRES_DB,
      autoLoadEntities: true,
    }),
    CqrsModule.forRoot(),
    ListsModule,
    AuthModule,
    HouseholdsModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: EventBus,
      useClass: NestEventBus
    },
    AppService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(UserIdMiddleware).forRoutes("*");
    consumer
      .apply(TenantMiddleware)
      .exclude(
        { path: 'households/me', method: RequestMethod.GET },
        { path: 'households/new', method: RequestMethod.POST },
        { path: 'auth/*', method: RequestMethod.ALL }
      );
  }
}
