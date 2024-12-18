import { CreateNewUserCommand, CreateNewUserCommandHandler, CreateNewUserDto } from './';
import { FakeUserCreationService } from '../../test-fixtures/fake.user-creation.service';

describe('CreateNewUserCommand', () => {
  let command: CreateNewUserCommand;
  let handler: CreateNewUserCommandHandler;
  let dto: CreateNewUserDto;
  let fakeUserCreationService: FakeUserCreationService;

  beforeEach(async () => {
    handler = new CreateNewUserCommandHandler(fakeUserCreationService);
    dto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };
    command = new CreateNewUserCommand(dto);
    await handler.execute(command);
  });

  it('should create a new user with the provided details', async () => {

  });
});
