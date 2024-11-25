export class FindHouseholdForMemberQuery {
  constructor(private readonly _memberId: string) {}

  memberId(): string {
    return this._memberId;
  }
}
