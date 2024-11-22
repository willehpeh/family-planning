import { HouseholdMemberDto } from '../dtos/household-member.dto';

export class FindHouseholdForMemberQuery {
  constructor(public readonly member: HouseholdMemberDto) {}
}
