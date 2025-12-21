import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  // IP da sua API no Kubernetes que validamos anteriormente
  private readonly API_URL = 'http://20.226.170.108/api/Auth';
  
  // Usando Signals (Angular 17+) para gerenciar o estado do token
  token = signal<string | null>(localStorage.getItem('token'));

  login(credentials: any) {
    return this.http.post<any>(`${this.API_URL}/login`, credentials).pipe(
      tap(res => {
        // Armazena o token recebido no 200 OK que testamos
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