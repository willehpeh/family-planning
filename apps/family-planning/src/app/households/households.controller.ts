import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { HouseholdsService } from './households.service';
import { Request } from 'express';

@Controller('households')
export class HouseholdsController {

  constructor(private readonly householdsService: HouseholdsService) {}

  @Post('new')
  newHousehold(@Req() req: Request, @Body('householdName') householdName: string) {
    return this.householdsService.createNewHousehold(
      householdName,
      req['userId'],
      req['userLastName'],
      req['userFirstName'],
      req['userEmail']
    );
  }

  @Get('me')
  getMe(@Req() req: Request) {
    return this.householdsService.getHouseholdForUserId(req['userId']);
  }
}
