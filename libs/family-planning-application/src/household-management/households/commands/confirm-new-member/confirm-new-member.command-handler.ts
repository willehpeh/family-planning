import { HouseholdMemberId, HouseholdRepository, UserId } from '@family-planning/domain';
import { ConfirmNewMemberCommand } from './confirm-new-member.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ConfirmNewMemberCommand)
export class ConfirmNewMemberCommandHandler implements ICommandHandler<ConfirmNewMemberCommand> {
  constructor(private readonly householdRepository: HouseholdRepository) {}

  async execute(command: ConfirmNewMemberCommand) {
    const household = await this.householdRepository.findById(command.dto.householdId);
    const memberId = HouseholdMemberId.fromString(command.dto.memberId);
    const userId = new UserId(command.dto.userId);
    household.confirmNewMember(memberId, userId);
    await this.householdRepository.save(household);
  }
}
