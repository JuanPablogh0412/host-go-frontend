// login.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppSettings } from '../../app-settings';

export interface LoginRequest {
  correo: string;
  contrasena: string;
}

export interface LoginResponse {
  token: string;
  arrendador?: any;
  arrendatario?: any;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${AppSettings.baseUrl}/auth`;

  private authState = new BehaviorSubject<boolean>(this.hasToken());
  authState$ = this.authState.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  private hasToken(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem('jwt');
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap(res => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          if (res.arrendador) localStorage.setItem('user', JSON.stringify(res.arrendador));
          if (res.arrendatario) localStorage.setItem('user', JSON.stringify(res.arrendatario));
          this.authState.next(true);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this.authState.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem('jwt');
  }
  
}
