import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <a routerLink="/" class="text-2xl font-bold text-indigo-600">CourseDash</a>
            </div>
          </div>
          
          <div class="flex items-center">
            @if (authService.isAuthenticated()) {
              <div class="relative" #userMenu>
                <button 
                  (click)="toggleUserMenu()"
                  class="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  <span class="user-name">{{ user?.name }}</span>
                  <i class="fas fa-chevron-down text-xs"></i>
                </button>

                @if (isUserMenuOpen) {
                  <div class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div class="py-1">
                      <a routerLink="/profile" class="dropdown-item">
                        <i class="fas fa-user mr-2"></i>
                        Profile
                      </a>
                      <a routerLink="/settings" class="dropdown-item">
                        <i class="fas fa-cog mr-2"></i>
                        Settings
                      </a>
                      <button (click)="logout()" class="dropdown-item w-full text-left">
                        <i class="fas fa-sign-out-alt mr-2"></i>
                        Logout
                      </button>
                    </div>
                  </div>
                }
              </div>
            } @else {
              <a 
                routerLink="/login"
                class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Login
              </a>
              <a 
                routerLink="/signup"
                class="ml-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Sign up
              </a>
            }
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .dropdown-item {
      @apply block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100;
    }
  `]
})
export class NavbarComponent implements OnInit {
  user: User | null = null;
  isUserMenuOpen = false;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser$().subscribe(user => {
      this.user = user;
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