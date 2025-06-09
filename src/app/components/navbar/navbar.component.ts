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
          
          <div class="flex items-center space-x-4">
            @if (authService.isAuthenticated()) {
              <button 
                (click)="logout()"
                class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors duration-200"
              >
                <i class="fas fa-sign-out-alt mr-2"></i>
                <span class="hidden md:inline">Logout</span>
              </button>

              <div class="relative ml-3" #userMenu>
                <button 
                  (click)="toggleUserMenu()"
                  class="flex items-center max-w-xs rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <div class="flex items-center space-x-3 px-3 py-2 rounded-full hover:bg-gray-50">
                    <div class="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span class="text-indigo-600 font-medium text-sm">
                        {{ getInitials(user?.name || '') }}
                      </span>
                    </div>
                    <span class="text-gray-700 font-medium hidden md:block">{{ user?.name }}</span>
                    <i class="fas fa-chevron-down text-xs text-gray-400"></i>
                  </div>
                </button>

                @if (isUserMenuOpen) {
                  <div 
                    class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
                    (clickOutside)="isUserMenuOpen = false"
                  >
                    <div class="py-1">
                      <div class="px-4 py-2 text-sm text-gray-700 border-b">
                        <p class="font-medium">{{ user?.name }}</p>
                        <p class="text-gray-500 truncate">{{ user?.email }}</p>
                      </div>
                      <a routerLink="/profile" class="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <i class="fas fa-user mr-3 text-gray-400 group-hover:text-indigo-500"></i>
                        Profile
                      </a>
                      <a routerLink="/settings" class="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <i class="fas fa-cog mr-3 text-gray-400 group-hover:text-indigo-500"></i>
                        Settings
                      </a>
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
    :host {
      display: block;
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

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
} 