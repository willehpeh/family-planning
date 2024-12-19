import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewUserCommand } from './create-new-user.command';
import { UserCreationService } from '../../providers';
import { EventBus, UserCreatedEvent } from '@family-planning/domain';

@CommandHandler(CreateNewUserCommand)
export class CreateNewUserCommandHandler implements ICommandHandler<CreateNewUserCommand> {
  constructor(private readonly userCreationService: UserCreationService,
              private readonly eventBus: EventBus) {}

  async execute(command: CreateNewUserCommand): Promise<void> {
    await this.userCreationService.createUser(
      command.dto.firstName,
      command.dto.lastName,
      command.dto.email,
    );
    const { firstName, lastName, email } = command.dto;
    const userId = await this.userCreationService.getUserIdForEmail(email);

    await this.eventBus.publish(new UserCreatedEvent({ userId, firstName, lastName, email }));
  }
}
