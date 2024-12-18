import { UserCreationService } from '../providers';

export class FakeUserCreationService implements UserCreationService {
  createdUser() {
    return {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };
  }
}
