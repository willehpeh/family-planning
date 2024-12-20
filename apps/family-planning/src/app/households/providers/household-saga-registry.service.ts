import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Observable, tap } from 'rxjs';

@Injectable()
export class HouseholdSagaRegistry {
  constructor(private readonly commandBus: CommandBus) {
  }

  registerSaga(saga: { commands$: Observable<any> }) {
    saga.commands$.pipe(
      tap(command => this.commandBus.execute(command))
    ).subscribe();
  }
}
