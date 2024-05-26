import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  setRole(role: string): void {
    localStorage.setItem('role', role);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  removeRole(): void {
    localStorage.removeItem('role');
  }

  logout(): void {
    this.removeToken();
    this.removeRole();
  }
}
