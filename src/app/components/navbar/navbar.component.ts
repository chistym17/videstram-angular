import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-white shadow-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo and Main Navigation -->
          <div class="flex">
            <a routerLink="/" class="flex items-center">
              <span class="text-xl font-bold text-indigo-600">CourseHub</span>
            </a>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <!-- Home Tab -->
              <a 
                routerLink="/" 
                routerLinkActive="border-indigo-500 text-gray-900"
                [routerLinkActiveOptions]="{exact: true}"
                class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Home
              </a>

              <!-- Dashboard Tab (only for authenticated users) -->
              @if (currentUser$ | async) {
                <a 
                  routerLink="/dashboard" 
                  routerLinkActive="border-indigo-500 text-gray-900"
                  class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  Dashboard
                </a>
              }

              <!-- Courses Tab -->
              <a 
                routerLink="/courses" 
                routerLinkActive="border-indigo-500 text-gray-900"
                class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Courses
              </a>
            </div>
          </div>

          <!-- User Menu -->
          <div class="flex items-center">
            @if (currentUser$ | async; as user) {
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-3">
                  <img
                    [src]="user.avatar || 'https://ui-avatars.com/api/?name=' + user.name"
                    [alt]="user.name"
                    class="h-8 w-8 rounded-full"
                  />
                  <span class="text-sm font-medium text-gray-700">{{ user.name }}</span>
                </div>
                <button
                  (click)="logout()"
                  class="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            } @else {
              <div class="flex items-center space-x-4">
                <a
                  routerLink="/login"
                  class="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Sign in
                </a>
            
              </div>
            }
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class NavbarComponent {
  currentUser$;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.getCurrentUser$();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 