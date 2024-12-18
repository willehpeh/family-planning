import { UserCreationService } from '../providers';

export class FakeUserCreationService implements UserCreationService {

  private _createdUser = {
    firstName: '',
    lastName: '',
    email: '',
    id: ''
  };

  createUser(firstName: string, lastName: string, email: string): Promise<void> {
    this._createdUser = {
      firstName,
      lastName,
      email,
      id: crypto.randomUUID()
    };
    return Promise.resolve(undefined);
  }

  getUserIdForEmail(email: string): Promise<string> {
    if (email === this._createdUser.email) {
      return Promise.resolve(this._createdUser.id);
    }
    return Promise.reject();
  }

  createdUser() {
    return this._createdUser;
  }
}
