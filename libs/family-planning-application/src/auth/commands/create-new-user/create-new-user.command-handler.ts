import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewUserCommand } from './create-new-user.command';
import { UserRepository } from '@family-planning/domain';

@CommandHandler(CreateNewUserCommand)
export class CreateNewUserCommandHandler implements ICommandHandler<CreateNewUserCommand> {
  constructor(private readonly userRepository: UserRepository) {
  }

  async execute(command: CreateNewUserCommand): Promise<void> {
  }
}
