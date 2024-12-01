import { Controller, Get, Req } from '@nestjs/common';
import { HouseholdsService } from './households.service';
import { Request } from 'express';

@Controller('households')
export class HouseholdsController {

  constructor(private readonly householdsService: HouseholdsService) {}

  @Get('new')
  newHousehold(@Req() req: Request) {
    return this.householdsService.createNewHousehold(
      'My Household',
      req['userId'],
      req['userLastName'],
      req['userFirstName'],
      req['userEmail']
    );
  }

  @Get('me')
  getMe(@Req() req: Request) {
    return this.householdsService.getMe(req['userId']);
  }
}
