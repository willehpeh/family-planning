import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoadUserInfoSuccess } from '../../auth/state/auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import {
  CreateHousehold,
  CreateHouseholdFailure, CreateHouseholdSuccess,
  LoadHouseholdInfo,
  LoadHouseholdInfoFailure,
  LoadHouseholdInfoSuccess
} from './households.actions';
import { HouseholdsService } from '../services/households.service';

@Injectable()
export class HouseholdsEffects {
  private actions$ = inject(Actions);
  private householdsService = inject(HouseholdsService);

  loadHouseholdInfoOnLoadUserInfoSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LoadUserInfoSuccess),
    map(() => LoadHouseholdInfo())
  ));

  loadHouseholdInfo$ = createEffect(() => this.actions$.pipe(
    ofType(LoadHouseholdInfo),
    switchMap(() => this.householdsService.loadHouseholdInfo().pipe(
      map(({ householdId, householdName }) => LoadHouseholdInfoSuccess({ householdId, householdName})),
      catchError(() => of(LoadHouseholdInfoFailure()))
    ))
  ));

  navigateToDashboardOnLoadHouseholdInfoSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LoadHouseholdInfoSuccess),
    tap(() => this.householdsService.redirectToDashboard())
  ), { dispatch: false });

  navigateToNewHouseholdPageOnLoadHouseholdInfoFailure$ = createEffect(() => this.actions$.pipe(
    ofType(LoadHouseholdInfoFailure),
    tap(() => this.householdsService.redirectToHouseholdCreation())
  ), { dispatch: false });

  createHousehold$ = createEffect(() => this.actions$.pipe(
    ofType(CreateHousehold),
    switchMap(({ householdName }) => this.householdsService.createHousehold(householdName).pipe(
      map(() => CreateHouseholdSuccess()),
      catchError(() => of(CreateHouseholdFailure()))
    ))
  ));

  redirectToDashboardOnCreateHouseholdSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(CreateHouseholdSuccess),
    tap(() => this.householdsService.redirectToDashboard())
  ), { dispatch: false });
}
