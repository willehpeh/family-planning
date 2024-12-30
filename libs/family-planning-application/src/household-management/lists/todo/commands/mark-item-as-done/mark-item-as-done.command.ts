import { MarkItemAsDoneDto } from './mark-item-as-done.dto';

export class MarkItemAsDoneCommand {
  constructor(public readonly dto: MarkItemAsDoneDto) {}
}
