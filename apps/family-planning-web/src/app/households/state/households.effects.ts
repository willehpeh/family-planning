import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoadUserInfoSuccess } from '../../auth/state/auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import {
  CreateHousehold,
  CreateHouseholdFailure, CreateHouseholdSuccess, InviteNewMember, InviteNewMemberFailure, InviteNewMemberSuccess,
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
      map(myHousehold => LoadHouseholdInfoSuccess({ myHousehold })),
      catchError(() => of(LoadHouseholdInfoFailure()))
    ))
  ));

  navigateToCommandCentreOnLoadHouseholdInfoSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LoadHouseholdInfoSuccess),
    tap(() => this.householdsService.redirectToCommandCentre())
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

  loadHouseholdInfoOnCreateHouseholdSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(CreateHouseholdSuccess),
    map(() => LoadHouseholdInfo())
  ));

  inviteNewMember$ = createEffect(() => this.actions$.pipe(
    ofType(InviteNewMember),
    switchMap(action => this.householdsService.inviteNewMember(action.info).pipe(
      map(() => InviteNewMemberSuccess()),
      catchError(() => of(InviteNewMemberFailure()))
    ))
  ));

  reloadHouseholdInfoOnInviteNewMemberSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(InviteNewMemberSuccess),
    map(() => LoadHouseholdInfo())
  ));
}
