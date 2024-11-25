import { CreateNewHouseholdDto } from './create-new-household.dto';

export class CreateNewHouseholdCommand {
  constructor(public readonly dto: CreateNewHouseholdDto) {
  }
}
