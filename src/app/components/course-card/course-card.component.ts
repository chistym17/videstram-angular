import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Course } from '../../services/course.service';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div class="relative">
        <img [src]="course.thumbnail" [alt]="course.title" class="w-full h-48 object-cover">
        <div class="absolute top-4 right-4">
          <span [class]="getLevelBadgeClass()" class="px-2 py-1 rounded-full text-xs font-medium">
            {{ course.level }}
          </span>
        </div>
      </div>

      <div class="p-6">
        <div class="flex items-center mb-4">
          <img [src]="course.instructorImage" [alt]="course.instructor" 
               class="w-10 h-10 rounded-full object-cover">
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-900">{{ course.instructor }}</p>
            <p class="text-xs text-gray-500">{{ course.category }}</p>
          </div>
        </div>

        <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{{ course.title }}</h3>
        <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ course.description }}</p>

        <div class="flex flex-wrap gap-2 mb-4">
          @for (topic of course.topics.slice(0, 2); track topic) {
            <span class="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs">
              {{ topic }}
            </span>
          }
          @if (course.topics.length > 2) {
            <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              +{{ course.topics.length - 2 }} more
            </span>
          }
        </div>

        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-4">
            <div class="flex items-center">
              <i class="fas fa-video text-gray-400 mr-1"></i>
              <span class="text-sm text-gray-600">{{ course.videoCount }} videos</span>
            </div>
            <div class="flex items-center">
              <i class="fas fa-clock text-gray-400 mr-1"></i>
              <span class="text-sm text-gray-600">{{ course.duration }}</span>
            </div>
          </div>
          <div class="flex items-center">
            <i class="fas fa-star text-yellow-400 mr-1"></i>
            <span class="text-sm font-medium text-gray-900">{{ course.rating }}</span>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-500">
            {{ course.enrolledStudents.toLocaleString() }} students
          </div>
          <a [routerLink]="['/course', course.id]" 
             class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
            View Course
            <i class="fas fa-arrow-right ml-2"></i>
          </a>
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
export class CourseCardComponent {
  @Input() course!: Course;

  getLevelBadgeClass(): string {
    switch (this.course.level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
} 