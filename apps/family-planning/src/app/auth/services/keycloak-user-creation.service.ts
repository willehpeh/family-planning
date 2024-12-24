import { Injectable } from '@nestjs/common';
import { UserCreationService } from '@family-planning/application';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, EMPTY, lastValueFrom, map, switchMap } from 'rxjs';

@Injectable()
export class KeycloakUserCreationService implements UserCreationService {

  constructor(private readonly http: HttpService,
              private readonly config: ConfigService) {
  }

  async createUser(firstName: string, lastName: string, email: string): Promise<void> {
    const token = await this.accessToken();
    const userPayload = this.generateUserPayload(email, firstName, lastName);
    return lastValueFrom(this.http.post(`${ this.config.get('KC_ADMIN_URL') }/users`, userPayload, { headers: { Authorization: `Bearer ${ token }` } }).pipe(
      switchMap(() => this.http.get(`${ this.config.get('KC_ADMIN_URL') }/users?email=${ email }`, { headers: { Authorization: `Bearer ${ token }` } })),
      map(response => response.data[0].id),
      switchMap(id => this.http.put(`${ this.config.get('KC_ADMIN_URL') }/users/${ id }/execute-actions-email`, null, {
        headers: {
          Authorization: `Bearer ${ token }`,
          'Content-Type': 'application/json'
        }
      })),
      map(() => {
        return;
      }),
      catchError(() => EMPTY)
    ));
  }

  private generateUserPayload(email: string, firstName: string, lastName: string) {
    return {
      username: email,
      firstName,
      lastName,
      email,
      enabled: true,
      emailVerified: true,
      requiredActions: ['UPDATE_PASSWORD'],
    };
  }

  async getUserIdForEmail(email: string): Promise<string> {
    const token = await this.accessToken();
    return lastValueFrom(this.http.get(`${ this.config.get('KC_ADMIN_URL') }/users?email=${ email }`, { headers: { Authorization: `Bearer ${token}` } }).pipe(
      map(response => response.data[0].id)
    ));
  }

  private accessToken(): Promise<string> {
    const authPayload = {
      grant_type: 'password',
      client_id: 'admin-cli',
      username: this.config.get('KC_MASTER_USERNAME'),
      password: this.config.get('KC_MASTER_PASSWORD'),
    };
    return lastValueFrom(this.http.post(`${ this.config.get('KC_MASTER_AUTH_URL') }`, authPayload, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).pipe(
      map(response => response.data['access_token']),
    ));
  }

}
