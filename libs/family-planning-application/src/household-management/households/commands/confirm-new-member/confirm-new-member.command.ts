import { ConfirmNewMemberDto } from './confirm-new-member.dto';

export class ConfirmNewMemberCommand {
  constructor(public readonly dto: ConfirmNewMemberDto) {
  }
}
