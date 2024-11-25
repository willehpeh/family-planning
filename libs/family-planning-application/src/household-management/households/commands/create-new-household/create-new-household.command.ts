import { CreateNewHouseholdDto } from './create-new-household.dto';

export class CreateNewHouseholdCommand {
  constructor(private readonly dto: CreateNewHouseholdDto) {
  }
}
