import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { HouseholdsService } from '../providers/households.service';
import { AuthenticatedHouseholdRequest } from '../../common/authenticated-household-request';
import { AuthenticatedRequest } from '../../common/authenticated-request';
import { POSTNewHouseholdDto } from '../dtos/POST.new-household.dto';
import { POSTInviteNewMemberDto } from '../dtos/POST.invite-new-member.dto';

@Controller('households')
export class HouseholdsController {

  constructor(private readonly householdsService: HouseholdsService) {}

  @Post('new')
  newHousehold(@Req() req: AuthenticatedRequest, @Body() { householdName }: POSTNewHouseholdDto) {
    return this.householdsService.createNewHousehold(
      householdName,
      req.userId,
      req.userLastName,
      req.userFirstName,
      req.userEmail
    );
  }

  @Get('me')
  getMe(@Req() req: AuthenticatedRequest) {
    return this.householdsService.getHouseholdForUserId(req.userId);
  }

  @Post('invite-member')
  inviteNewMember(@Req() req: AuthenticatedHouseholdRequest, @Body() memberDetails: POSTInviteNewMemberDto) {
    return this.householdsService.inviteNewMember(
      req.householdId,
      memberDetails.lastName,
      memberDetails.firstName,
      memberDetails.email
    );
  }
}
