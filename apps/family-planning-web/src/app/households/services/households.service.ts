import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HouseholdsService {
  private http = inject(HttpClient);
  private router = inject(Router);

  loadHouseholdInfo(): Observable<{ householdId: string, householdName: string }> {
    return this.http.get<{ id: string, name: string }>('/api/households/me').pipe(
      map(({ id, name }) => ({ householdId: id, householdName: name }))
    );
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
}
