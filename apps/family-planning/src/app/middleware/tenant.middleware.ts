import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataSource } from 'typeorm';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private dataSource: DataSource) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'];
    if (!tenantId) {
      throw new Error('Tenant ID is required');
    }

    await this.dataSource.query(`SET app.tenant_id = '${tenantId}'`);
    next();
  }
}
