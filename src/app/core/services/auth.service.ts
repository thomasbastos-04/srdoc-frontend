import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://20.226.170.108/api/Auth';
  
  token = signal<string | null>(localStorage.getItem('token'));

  login(credentials: any) {
    return this.http.post<any>(`${this.API_URL}/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem('token', res.accessToken);
        this.token.set(res.accessToken);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.token.set(null);
  }
}