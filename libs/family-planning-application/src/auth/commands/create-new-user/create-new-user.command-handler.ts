import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewUserCommand } from './create-new-user.command';
import { UserCreationService } from '../../providers';

@CommandHandler(CreateNewUserCommand)
export class CreateNewUserCommandHandler implements ICommandHandler<CreateNewUserCommand> {
  constructor(private readonly userCreationService: UserCreationService) {
  }

  async execute(command: CreateNewUserCommand): Promise<void> {
    await this.userCreationService.createUser(
      command.dto.firstName,
      command.dto.lastName,
      command.dto.email,
    );
  }
}
