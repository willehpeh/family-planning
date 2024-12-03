export class HouseholdMemberReadModel {
  constructor(public readonly id: string,
              public readonly lastName: string,
              public readonly firstName: string,
              public readonly email: string,
              public readonly householdId: string) {
  }
}
