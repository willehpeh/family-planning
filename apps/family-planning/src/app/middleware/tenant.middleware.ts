import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataSource } from 'typeorm';
import { QueryBus } from '@nestjs/cqrs';
import { FindHouseholdForUserIdQuery } from '@family-planning/application';
import { HouseholdReadModel } from '@family-planning/domain';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly dataSource: DataSource,
              private readonly queryBus: QueryBus) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req['userId'];
    if (!userId) {
      throw new UnauthorizedException('User ID is required');
    }
    const household: HouseholdReadModel = await this.queryBus.execute(new FindHouseholdForUserIdQuery(userId));
    if (!household) {
      throw new UnauthorizedException('No household found for user');
    }
    const householdId = household.id;
    req['householdId'] = householdId;
    await this.dataSource.query(`SET app.tenant_id = '${householdId}'`);
    next();
  }
}
