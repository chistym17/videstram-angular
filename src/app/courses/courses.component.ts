import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService, Course } from '../services/course.service';
import { CourseCardComponent } from '../components/course-card/course-card.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CourseCardComponent],
  template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="text-center mb-12">
          <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl">
            Explore Our Courses
          </h1>
          <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover a wide range of courses in Mathematics, Physics, and Chemistry. 
            Learn from expert instructors and advance your knowledge.
          </p>
        </div>

        <!-- Filters Section -->
        <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center space-x-4">
            <button 
              *ngFor="let category of categories" 
              (click)="setCategory(category)"
              [class]="selectedCategory === category ? 
                'px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium' : 
                'px-4 py-2 rounded-full bg-white text-gray-700 text-sm font-medium hover:bg-gray-50'"
            >
              {{ category }}
            </button>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-600">Sort by:</span>
            <select 
              (change)="onSortChange($event)"
              class="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="rating">Rating</option>
              <option value="students">Students</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        <!-- Courses Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (course of filteredCourses; track course.id) {
            <app-course-card [course]="course"></app-course-card>
          }
        </div>

        <!-- Empty State -->
        @if (filteredCourses.length === 0) {
          <div class="text-center py-12">
            <div class="text-gray-400 mb-4">
              <i class="fas fa-book-open text-6xl"></i>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p class="text-gray-600">Try adjusting your filters to find what you're looking for.</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  categories = ['All', 'Mathematics', 'Physics', 'Chemistry'];
  selectedCategory = 'All';

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
      this.filteredCourses = courses;
    });
  }

  setCategory(category: string) {
    this.selectedCategory = category;
    this.filterCourses();
  }

  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.sortCourses(value);
  }

  private filterCourses() {
    this.filteredCourses = this.selectedCategory === 'All' 
      ? this.courses 
      : this.courses.filter(course => course.category === this.selectedCategory);
  }

  private sortCourses(sortBy: string) {
    this.filteredCourses = [...this.filteredCourses].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'students':
          return b.enrolledStudents - a.enrolledStudents;
        case 'newest':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        default:
          return 0;
      }
    });
  }
} 