import { MarkDoneItemAsPendingDto } from './mark-done-item-as-pending.dto';

export class MarkDoneItemAsPendingCommand {
  constructor(public readonly dto: MarkDoneItemAsPendingDto) {
  }
}
