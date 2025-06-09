import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-white shadow-sm">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <!-- Logo and Main Navigation -->
          <div class="flex items-center space-x-8">
            <a routerLink="/" class="flex items-center space-x-2">
              <span class="text-xl font-bold text-indigo-600">CourseHub</span>
            </a>
            <div class="hidden md:flex space-x-4">
              <a routerLink="/courses" 
                 routerLinkActive="text-indigo-600"
                 [routerLinkActiveOptions]="{exact: true}"
                 class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Courses
              </a>
              <a routerLink="/dashboard" 
                 routerLinkActive="text-indigo-600"
                 class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </a>
            </div>
          </div>

          <!-- User Menu -->
          <div class="flex items-center space-x-4">
            @if (currentUser) {
              <div class="relative" (click)="toggleUserMenu()">
                <button class="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 focus:outline-none">
                  <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span class="text-indigo-600 font-medium">
                      {{ currentUser.name.charAt(0).toUpperCase() }}
                    </span>
                  </div>
                  <span class="hidden md:block text-sm font-medium">{{ currentUser.name }}</span>
                </button>

                <!-- Dropdown Menu -->
                @if (isUserMenuOpen) {
                  <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <a routerLink="/profile" 
                       class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </a>
                    <a routerLink="/settings" 
                       class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </a>
                    <button (click)="logout()" 
                            class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                      Sign out
                    </button>
                  </div>
                }
              </div>
            } @else {
              <a routerLink="/auth/login" 
                 class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Sign in
              </a>
              <a routerLink="/auth/signup" 
                 class="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium">
                Sign up
              </a>
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
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;
  isUserMenuOpen = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser$().subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.isUserMenuOpen = false;
  }
} 