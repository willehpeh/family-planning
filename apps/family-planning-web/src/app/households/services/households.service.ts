import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HouseholdInfo } from '../models/household-info';
import { MemberInvitationInfo } from '../models/member-invitation-info';

@Injectable({
  providedIn: 'root'
})
export class HouseholdsService {
  private http = inject(HttpClient);
  private router = inject(Router);

  loadHouseholdInfo(): Observable<HouseholdInfo> {
    return this.http.get<HouseholdInfo>('/api/households/me');
  }

  createHousehold(householdName: string): Observable<void> {
    return this.http.post<void>('/api/households/new', { householdName });
  }

  redirectToHouseholdCreation(): void {
    this.router.navigate(['/households/new']);
  }

  redirectToCommandCentre(): void {
    this.router.navigate(['/command-centre']);
  }

  inviteNewMember(info: MemberInvitationInfo): Observable<void> {
    return this.http.post<void>('/api/households/invite-member', info);
  }
}
