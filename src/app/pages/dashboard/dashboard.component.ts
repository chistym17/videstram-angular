import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { Course, CourseService } from '../../services/course.service';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, CourseCardComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Navbar -->
      <app-navbar />

      <!-- Main Content -->
      <div class="container mx-auto px-4 py-8">
        <!-- User Profile Section -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div class="flex items-start space-x-6">
            <!-- User Avatar -->
            <div class="flex-shrink-0">
              <img 
                [src]="currentUser?.avatar || 'https://ui-avatars.com/api/?name=' + (currentUser?.name || 'User')" 
                [alt]="currentUser?.name"
                class="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
            </div>

            <!-- User Info -->
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <div>
                  <h1 class="text-2xl font-bold text-gray-900">{{ currentUser?.name }}</h1>
                  <p class="text-gray-600">{{ currentUser?.email }}</p>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                    {{ currentUser?.role }}
                  </span>
                </div>
              </div>

              <!-- Stats -->
              <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-gray-50 rounded-lg p-4">
                  <div class="text-sm font-medium text-gray-500">Enrolled Courses</div>
                  <div class="mt-1 text-2xl font-semibold text-gray-900">{{ enrolledCourses.length }}</div>
                </div>
                <div class="bg-gray-50 rounded-lg p-4">
                  <div class="text-sm font-medium text-gray-500">Completed Lessons</div>
                  <div class="mt-1 text-2xl font-semibold text-gray-900">12</div>
                </div>
                <div class="bg-gray-50 rounded-lg p-4">
                  <div class="text-sm font-medium text-gray-500">Learning Streak</div>
                  <div class="mt-1 text-2xl font-semibold text-gray-900">5 days</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enrolled Courses Section -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900">Your Enrolled Courses</h2>
            <a 
              routerLink="/courses" 
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View All Courses
              <svg class="ml-2 -mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <!-- Course Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (course of enrolledCourses; track course.id) {
              <app-course-card [course]="course"></app-course-card>
            }
          </div>

          <!-- Empty State -->
          @if (enrolledCourses.length === 0) {
            <div class="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
              <div class="text-gray-400 mb-4">
                <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">No courses enrolled yet</h3>
              <p class="text-gray-600 mb-6">Start your learning journey by enrolling in a course.</p>
              <a 
                routerLink="/courses" 
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Browse Courses
              </a>
            </div>
          }
        </div>

        <!-- Recent Activity Section -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div class="space-y-4">
            @for (activity of recentActivity; track activity.id) {
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-gray-900">{{ activity.description }}</p>
                  <p class="text-sm text-gray-500">{{ activity.time }}</p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  enrolledCourses: Course[] = [];
  recentActivity = [
    {
      id: 1,
      description: 'Completed "Introduction to Quantum Mechanics" lesson',
      time: '2 hours ago'
    },
    {
      id: 2,
      description: 'Started "Wave Functions and Probability" lesson',
      time: 'Yesterday'
    },
    {
      id: 3,
      description: 'Enrolled in "Advanced Calculus" course',
      time: '3 days ago'
    }
  ];

  constructor(
    private authService: AuthService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    // Get current user
    this.authService.getCurrentUser$().subscribe(user => {
      this.currentUser = user;
    });

    // Get enrolled courses (dummy data for now)
    this.courseService.getCourses().subscribe(courses => {
      // For demo, we'll show the first 3 courses as enrolled
      this.enrolledCourses = courses.slice(0, 3);
    });
  }
} 