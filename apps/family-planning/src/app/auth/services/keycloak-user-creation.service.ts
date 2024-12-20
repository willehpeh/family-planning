import { Injectable } from '@nestjs/common';
import { UserCreationService } from '@family-planning/application';

@Injectable()
export class KeycloakUserCreationService implements UserCreationService {
  createUser(firstName: string, lastName: string, email: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  getUserIdForEmail(email: string): Promise<string> {
    return Promise.resolve('');
  }

}
