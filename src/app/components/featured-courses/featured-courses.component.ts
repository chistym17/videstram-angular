import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService, Course } from '../../services/course.service';
import { CourseCardComponent } from '../course-card/course-card.component';

@Component({
  selector: 'app-featured-courses',
  standalone: true,
  imports: [CommonModule, RouterLink, CourseCardComponent],
  template: `
    <section class="w-full bg-gradient-to-b from-white to-gray-50">
      <!-- Section Container with proper padding -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <!-- Section Header with enhanced spacing and styling -->
          <div class="max-w-3xl mx-auto text-center space-y-6 mb-20">
              <span class="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold">
                  Popular Courses
              </span>
              <h2 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Featured Courses
              </h2>
              <p class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Explore our most popular courses, handpicked by our expert instructors. 
                  Start your learning journey today with these top-rated courses.
              </p>
          </div>

          <!-- Featured Courses Grid with enhanced spacing -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
              @for (course of featuredCourses; track course.id) {
                  <div class="transform transition-all duration-300 hover:-translate-y-2">
                      <app-course-card [course]="course"></app-course-card>
                  </div>
              }
          </div>

          <!-- View All Button with enhanced styling -->
          <div class="text-center">
              <a routerLink="/courses" 
                 class="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  View All Courses
                  <i class="fas fa-arrow-right ml-3"></i>
              </a>
          </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class FeaturedCoursesComponent implements OnInit {
  featuredCourses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    // Get all courses and select the top 3 by rating
    this.courseService.getCourses().subscribe(courses => {
      this.featuredCourses = courses
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);
    });
  }
} 