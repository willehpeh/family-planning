import { Controller, Get } from '@nestjs/common';
import { HouseholdsService } from './households.service';

@Controller('households')
export class HouseholdsController {

  constructor(private readonly householdsService: HouseholdsService) {
  }

  @Get('new')
  newHousehold() {
    return this.householdsService.createNewHousehold('My Household');
  }
}
