import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { UserInfoDto } from '../types/user-info.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  redirectToLogin(): void {
    window.location.href = '/api/auth/login';
  }

  loadUserInfo(): Observable<{ userInfo: UserInfoDto }> {
    return this.http.get<UserInfoDto>('/api/auth/userinfo').pipe(
      map(userInfo => ({ userInfo }))
    );
  }
}
