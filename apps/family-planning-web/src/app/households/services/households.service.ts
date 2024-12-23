import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HouseholdInfo } from '../models/household-info';

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

  redirectToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  inviteNewMember(memberDetails: { lastName: string, firstName: string, email: string }): Observable<void> {
    return this.http.post<void>('/api/households/invite-member', memberDetails);
  }
}
