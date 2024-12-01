import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class HouseholdsService {
  constructor(private readonly commandBus: CommandBus,
              private readonly queryBus: QueryBus) {
  }

}
