import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CookieMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies['access_token'];
    if (accessToken) {
      const decoded = jwt.decode(accessToken);
      req['userId'] = decoded.sub;
    }
    next();
  }
}
