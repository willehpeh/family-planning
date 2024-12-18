export abstract class UserCreationService {
  abstract createUser(firstName: string, lastName: string, email: string): Promise<void>;
  abstract getUserIdForEmail(email: string): Promise<string>;
}
