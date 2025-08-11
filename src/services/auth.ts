import { User } from '../types';

export class AuthService {
  private static instance: AuthService;
  private token: string | null = null;
  private user: User | null = null;

  private constructor() {
    // Load token and user from localStorage on initialization
    this.token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        this.user = JSON.parse(userData);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public setAuth(token: string, user: User): void {
    this.token = token;
    this.user = user;
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  public clearAuth(): void {
    this.token = null;
    this.user = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  public getToken(): string | null {
    return this.token;
  }

  public getUser(): User | null {
    return this.user;
  }

  public isAuthenticated(): boolean {
    return !!this.token && !!this.user;
  }

  public updateUser(updates: Partial<User>): void {
    if (this.user) {
      this.user = { ...this.user, ...updates };
      localStorage.setItem('user', JSON.stringify(this.user));
    }
  }

  public hasRole(role: 'buyer' | 'seller'): boolean {
    return this.user?.type === role;
  }
}

export const authService = AuthService.getInstance();
