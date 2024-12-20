import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { HouseholdsService } from './providers/households.service';
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

  @Post('invite-member')
  inviteNewMember(@Req() req: Request) {
    return this.householdsService.inviteNewMember(
      req['householdId'],
      'InvitedLastName',
      'InvitedFirstName',
      'will_alexander@me.com'
    );
  }
}
