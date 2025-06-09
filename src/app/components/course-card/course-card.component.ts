import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Course } from '../../services/course.service';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div class="relative">
        <img [src]="course.thumbnail" [alt]="course.title" class="w-full h-48 object-cover">
        <div class="absolute top-2 right-2">
          <span [class]="getLevelBadgeClass()" class="px-2 py-1 rounded-full text-xs font-medium">
            {{ course.level }}
          </span>
        </div>
      </div>

      <div class="p-4">
        <div class="flex items-center space-x-2 mb-3">
          <img [src]="course.instructor.avatar" [alt]="course.instructor.name" class="w-8 h-8 rounded-full">
          <span class="text-sm text-gray-600">{{ course.instructor.name }}</span>
        </div>

        <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {{ course.title }}
        </h3>

        <p class="text-sm text-gray-600 mb-4 line-clamp-2">
          {{ course.description }}
        </p>

        <div class="flex flex-wrap gap-2 mb-4">
          @for (topic of course.topics.slice(0, 3); track topic) {
            <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {{ topic }}
            </span>
          }
          @if (course.topics.length > 3) {
            <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{{ course.topics.length - 3 }} more
            </span>
          }
        </div>

        <div class="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div class="flex items-center space-x-4">
            <span class="flex items-center">
              <i class="fas fa-video mr-1"></i>
              {{ course.videos }} videos
            </span>
            <span class="flex items-center">
              <i class="fas fa-clock mr-1"></i>
              {{ course.duration }}
            </span>
          </div>
          <div class="flex items-center">
            <i class="fas fa-star text-yellow-400 mr-1"></i>
            {{ course.rating.toFixed(1) }}
          </div>
        </div>

        <a
          [routerLink]="['/course', course.id, 'watch']"
          class="block w-full text-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
        >
          View Course
        </a>
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
    const baseClass = 'px-2 py-1 rounded-full text-xs font-medium';
    switch (this.course.level) {
      case 'Beginner':
        return `${baseClass} bg-green-100 text-green-800`;
      case 'Intermediate':
        return `${baseClass} bg-yellow-100 text-yellow-800`;
      case 'Advanced':
        return `${baseClass} bg-red-100 text-red-800`;
      default:
        return `${baseClass} bg-gray-100 text-gray-800`;
    }
  }
} 