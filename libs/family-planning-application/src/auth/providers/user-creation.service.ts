export abstract class UserCreationService {
  abstract createUser(firstName: string, lastName: string, email: string): Promise<void>;
}
