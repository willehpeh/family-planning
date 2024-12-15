import { InviteNewMemberDto } from './invite-new-member.dto';

export class InviteNewMemberCommand {
  constructor(public readonly dto: InviteNewMemberDto) {}
}
