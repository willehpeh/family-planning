import { CreateNewUserDto } from './create-new-user.dto';

export class CreateNewUserCommand {
  constructor(public readonly dto: CreateNewUserDto) {
  }
}

