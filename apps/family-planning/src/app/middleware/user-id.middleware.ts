import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies['access_token'];
    if (accessToken) {
      try {
        const decoded = jwt.decode(accessToken);
        req['userId'] = decoded.sub;
      } catch {
        throw new UnauthorizedException();
      }
    }
    next();
  }
}
