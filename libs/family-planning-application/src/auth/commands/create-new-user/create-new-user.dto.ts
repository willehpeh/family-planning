export class CreateNewUserDto {

  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly householdId: string;
  readonly memberId: string;

  constructor(details: { firstName: string, lastName: string, email: string, householdId: string, memberId: string }) {
    this.firstName = details.firstName;
    this.lastName = details.lastName;
    this.email = details.email;
    this.householdId = details.householdId;
    this.memberId = details.memberId;
  }
}
