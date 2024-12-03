import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HouseholdsService {
  private http = inject(HttpClient);

  loadHouseholdInfo(): Observable<{ householdId: string, householdName: string }> {
    return this.http.get<{ id: string, name: string }>('/api/households/me').pipe(
      map(({ id, name }) => ({ householdId: id, householdName: name }))
    );
  }
}
