import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Observable } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://20.226.170.108/api/Auth';

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