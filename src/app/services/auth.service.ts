import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
  token?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private state = new BehaviorSubject<AuthState>(initialState);
  private backendUrl = environment.backendUrl;
  private isBrowser: boolean;
  
  public state$ = this.state.asObservable();

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.checkStoredUser();
    }
  }

  private checkStoredUser() {
    if (!this.isBrowser) return;

    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('authToken');
    
    if (storedUser && storedToken) {
      try {
        const user = JSON.parse(storedUser);
        this.state.next({
          ...initialState,
          user: { ...user, token: storedToken },
          isAuthenticated: true
        });
      } catch (error) {
        this.clearStorage();
      }
    }
  }

  private clearStorage() {
    if (!this.isBrowser) return;
    
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  }

  getCurrentUser(): User | null {
    return this.state.value.user;
  }

  getCurrentUser$(): Observable<User | null> {
    return this.state$.pipe(
      map(state => state.user)
    );
  }

  isAuthenticated(): boolean {
    return this.state.value.isAuthenticated;
  }

  async login(email: string, password: string): Promise<void> {
    this.state.next({ ...this.state.value, loading: true, error: null });
    
    try {
      const response = await fetch(`${this.backendUrl}/get-token?video_id=sample1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Token from API:', data);

      if (data.token) {
        // Create a minimal user object with just email and token
        const user: User = {
          id: 'temp-id', // We'll use a temporary ID since we don't have one from the API
          email: email,
          name: email.split('@')[0], // Use part of email as name
          role: 'student',
          token: data.token
        };

        if (this.isBrowser) {
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('user', JSON.stringify(user));
        }

        this.state.next({
          user,
          isAuthenticated: true,
          loading: false,
          error: null
        });
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      this.clearStorage();
      this.state.next({
        ...this.state.value,
        loading: false,
        error: 'Login failed. Please check your credentials.'
      });
      throw error;
    }
  }

  async signup(email: string, password: string, name: string): Promise<void> {
    this.state.next({ ...this.state.value, loading: true, error: null });
    
    try {
      const response = await fetch(`${this.backendUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name })
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();

      if (data.token) {
        const user: User = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          role: data.user.role || 'student',
          token: data.token
        };

        if (this.isBrowser) {
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('user', JSON.stringify(user));
        }

        this.state.next({
          user,
          isAuthenticated: true,
          loading: false,
          error: null
        });
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      this.clearStorage();
      this.state.next({
        ...this.state.value,
        loading: false,
        error: 'Signup failed. Please try again.'
      });
      throw error;
    }
  }

  logout(): void {
    this.clearStorage();
    this.state.next(initialState);
  }

  async updateProfile(updates: Partial<User>): Promise<void> {
    const currentUser = this.state.value.user;
    if (!currentUser?.token) throw new Error('No user logged in');

    this.state.next({ ...this.state.value, loading: true, error: null });
    
    try {
      const response = await fetch(`${this.backendUrl}/auth/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        },
        body: JSON.stringify(updates)
      });

      if (!response.ok) {
        throw new Error('Profile update failed');
      }

      const data = await response.json();
      const updatedUser = { ...currentUser, ...data.user };

      localStorage.setItem('user', JSON.stringify(updatedUser));

      this.state.next({
        ...this.state.value,
        user: updatedUser,
        loading: false,
        error: null
      });
    } catch (error) {
      this.state.next({
        ...this.state.value,
        loading: false,
        error: 'Profile update failed. Please try again.'
      });
      throw error;
    }
  }

  // Helper method to get auth token
  getAuthToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem('authToken');
  }

  // Helper method to check if token is valid
  async validateToken(): Promise<boolean> {
    const token = this.getAuthToken();
    if (!token) return false;

    try {
      const response = await fetch(`${this.backendUrl}/auth/validate-token`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return response.ok;
    } catch {
      return false;
    }
  }
} 