import { CreateNewUserCommand, CreateNewUserCommandHandler, CreateNewUserDto } from './';
import { FakeUserCreationService } from '../../test-fixtures/fake.user-creation.service';
import { FakeEventBus } from '../../../shared';
import { UserCreatedForHouseholdEvent } from '@family-planning/domain';

describe('CreateNewUserCommand', () => {
  let command: CreateNewUserCommand;
  let handler: CreateNewUserCommandHandler;
  let dto: CreateNewUserDto;
  let fakeUserCreationService: FakeUserCreationService;
  let fakeEventBus: FakeEventBus;

  beforeEach(async () => {
    fakeUserCreationService = new FakeUserCreationService();
    fakeEventBus = new FakeEventBus();
    handler = new CreateNewUserCommandHandler(fakeUserCreationService, fakeEventBus);
    dto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      householdId: '1234567890',
      memberId: '9876543210',
    };
    command = new CreateNewUserCommand(dto);
    await handler.execute(command);
  });

  describe('Craeted user', () => {
    it('should create a new user with the provided details', async () => {
      expect(fakeUserCreationService.createdUser()).toMatchObject({
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
      });
    });

    it('should create a new user with an ID', async () => {
      expect(fakeUserCreationService.createdUser().id).toBeDefined();
    });
  });

  describe('UserCreatedEvent raised', () => {

    let raisedEvent: UserCreatedForHouseholdEvent;

    beforeEach(() => {
      raisedEvent = fakeEventBus.events[0] as UserCreatedForHouseholdEvent;
    });

    it('should raise a UserCreatedEvent', async () => {
      expect(raisedEvent).toBeInstanceOf(UserCreatedForHouseholdEvent);
    });

    it('should raise the correct event', async () => {
      expect(raisedEvent).toMatchObject({
        userId: fakeUserCreationService.createdUser().id,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
      });
    });
  });
});
