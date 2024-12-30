import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies['access_token'];
    if (accessToken) {
      try {
        this.extractUserDataFromToken(accessToken, req);
      } catch {
        throw new UnauthorizedException();
      }
    }
    next();
  }

  private extractUserDataFromToken(accessToken: string, req: Request) {
    const decoded = jwt.decode(accessToken);
    req['userId'] = decoded.sub;
    req['userLastName'] = decoded['family_name'];
    req['userFirstName'] = decoded['given_name'];
    req['userEmail'] = decoded['email'];
    req['username'] = decoded['preferred_username'];
  }
}
