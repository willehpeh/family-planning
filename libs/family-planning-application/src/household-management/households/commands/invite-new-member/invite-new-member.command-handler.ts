import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InviteNewMemberCommand } from './invite-new-member.command';
import { Email, EventBus, FirstName, HouseholdRepository, LastName } from '@family-planning/domain';

@CommandHandler(InviteNewMemberCommand)
export class InviteNewMemberCommandHandler implements ICommandHandler<InviteNewMemberCommand>{
  constructor(private readonly householdRepository: HouseholdRepository,
              private readonly eventBus: EventBus) {}

  async execute(command: InviteNewMemberCommand): Promise<void> {
    const household = await this.householdRepository.findById(command.dto.householdId);
    household.inviteNewMember({
      firstName: new FirstName(command.dto.firstName),
      lastName: new LastName(command.dto.lastName),
      email: new Email(command.dto.email),
    });
    await this.householdRepository.save(household);
    household.publishEventsTo(this.eventBus);
  }
}
