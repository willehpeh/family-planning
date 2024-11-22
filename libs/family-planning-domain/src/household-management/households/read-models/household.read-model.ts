import { HouseholdSnapshot } from '../entities';

export class HouseholdReadModel {
  id: string;
  constructor(snapshot: HouseholdSnapshot) {
    this.id = snapshot.id();
  }
}
