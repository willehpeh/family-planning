import { UserCreationService } from '../providers';

export class FakeUserCreationService implements UserCreationService {

  private _createdUser: { firstName: string, lastName: string, email: string } = {
    firstName: '',
    lastName: '',
    email: '',
  };

  createUser(firstName: string, lastName: string, email: string): Promise<void> {
    this._createdUser = {
      firstName,
      lastName,
      email,
    };
    return Promise.resolve(undefined);
  }

  createdUser() {
    return this._createdUser;
  }
}
