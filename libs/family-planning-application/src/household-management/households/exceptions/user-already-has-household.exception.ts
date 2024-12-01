export class UserAlreadyHasHouseholdException extends Error {
  constructor() {
    super('User already has a household');
  }
}
