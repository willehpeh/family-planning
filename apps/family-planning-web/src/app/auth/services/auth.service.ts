import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  redirectToLogin(): void {
    window.location.href = '/api/auth/login';
  }

  userInfo(): Observable<{ user: unknown }> {
    return this.http.get<unknown>('/api/auth/userinfo').pipe(
      map(unknownUser => ({ user: unknownUser }))
    );
  }
}
