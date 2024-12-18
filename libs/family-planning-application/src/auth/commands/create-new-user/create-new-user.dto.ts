export class CreateNewUserDto {

  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;

  constructor(details: { firstName: string, lastName: string, email: string }) {
    this.firstName = details.firstName;
    this.lastName = details.lastName;
    this.email = details.email;
  }
}
