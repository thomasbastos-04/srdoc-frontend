import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private readonly API_URL = `${environment.apiBaseUrl}/Auth`;

  token = signal<string | null>(localStorage.getItem('token'));

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem('token', res.accessToken);
        this.token.set(res.accessToken);
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, userData);
  }

  logout() {
    localStorage.removeItem('token');
    this.token.set(null);
  }
}
