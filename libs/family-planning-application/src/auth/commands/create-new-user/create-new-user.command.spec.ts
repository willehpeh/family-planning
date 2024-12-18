import { CreateNewUserCommand, CreateNewUserCommandHandler, CreateNewUserDto } from './';
import { InMemoryUserRepository } from '../../test-fixtures/in-memory.user.repository';


describe('CreateNewUserCommand', () => {
  let command: CreateNewUserCommand;
  let handler: CreateNewUserCommandHandler;
  let inMemoryUserRepository: InMemoryUserRepository;
  let dto: CreateNewUserDto;

  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();
    handler = new CreateNewUserCommandHandler(inMemoryUserRepository);
    dto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };
    command = new CreateNewUserCommand(dto);
    await handler.execute(command);
  });
});
