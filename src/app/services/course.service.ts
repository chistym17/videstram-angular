import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorImage: string;
  thumbnail: string;
  videoCount: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Mathematics' | 'Physics' | 'Chemistry';
  topics: string[];
  rating: number;
  enrolledStudents: number;
  lastUpdated: string;
}

const DUMMY_COURSES: Course[] = [
  {
    id: 'math-101',
    title: 'Advanced Calculus',
    description: 'Master the fundamentals of calculus with practical applications and real-world examples.',
    instructor: 'Dr. Sarah Johnson',
    instructorImage: 'https://i.pravatar.cc/150?img=1',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format',
    videoCount: 24,
    duration: '12 weeks',
    level: 'Advanced',
    category: 'Mathematics',
    topics: ['Differential Calculus', 'Integral Calculus', 'Series', 'Multivariable Calculus'],
    rating: 4.8,
    enrolledStudents: 1245,
    lastUpdated: '2024-02-15'
  },
  {
    id: 'physics-201',
    title: 'Quantum Mechanics',
    description: 'Explore the fascinating world of quantum physics and its applications in modern technology.',
    instructor: 'Prof. Michael Chen',
    instructorImage: 'https://i.pravatar.cc/150?img=2',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format',
    videoCount: 32,
    duration: '16 weeks',
    level: 'Advanced',
    category: 'Physics',
    topics: ['Wave Functions', 'Quantum States', 'Entanglement', 'Quantum Computing'],
    rating: 4.9,
    enrolledStudents: 876,
    lastUpdated: '2024-02-10'
  },
  {
    id: 'chem-101',
    title: 'Organic Chemistry',
    description: 'Learn the principles of organic chemistry with focus on molecular structures and reactions.',
    instructor: 'Dr. Emily Rodriguez',
    instructorImage: 'https://i.pravatar.cc/150?img=3',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format',
    videoCount: 28,
    duration: '14 weeks',
    level: 'Intermediate',
    category: 'Chemistry',
    topics: ['Molecular Structure', 'Reaction Mechanisms', 'Stereochemistry', 'Synthesis'],
    rating: 4.7,
    enrolledStudents: 1567,
    lastUpdated: '2024-02-12'
  },
  {
    id: 'math-201',
    title: 'Linear Algebra',
    description: 'Master linear algebra concepts essential for computer science and engineering applications.',
    instructor: 'Prof. David Kim',
    instructorImage: 'https://i.pravatar.cc/150?img=4',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format',
    videoCount: 20,
    duration: '10 weeks',
    level: 'Intermediate',
    category: 'Mathematics',
    topics: ['Vector Spaces', 'Matrices', 'Eigenvalues', 'Linear Transformations'],
    rating: 4.6,
    enrolledStudents: 2341,
    lastUpdated: '2024-02-08'
  },
  {
    id: 'physics-101',
    title: 'Classical Mechanics',
    description: 'Understand the fundamental principles of classical mechanics and their applications.',
    instructor: 'Dr. Robert Wilson',
    instructorImage: 'https://i.pravatar.cc/150?img=5',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format',
    videoCount: 26,
    duration: '13 weeks',
    level: 'Intermediate',
    category: 'Physics',
    topics: ['Newtonian Mechanics', 'Lagrangian Dynamics', 'Hamiltonian Systems', 'Oscillations'],
    rating: 4.5,
    enrolledStudents: 1892,
    lastUpdated: '2024-02-14'
  },
  {
    id: 'chem-201',
    title: 'Physical Chemistry',
    description: 'Explore the principles of physical chemistry and their applications in modern science.',
    instructor: 'Prof. Lisa Thompson',
    instructorImage: 'https://i.pravatar.cc/150?img=6',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format',
    videoCount: 30,
    duration: '15 weeks',
    level: 'Advanced',
    category: 'Chemistry',
    topics: ['Thermodynamics', 'Kinetics', 'Quantum Chemistry', 'Spectroscopy'],
    rating: 4.8,
    enrolledStudents: 1123,
    lastUpdated: '2024-02-11'
  }
];

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor() {}

  getCourses(): Observable<Course[]> {
    return of(DUMMY_COURSES);
  }

  getCourseById(id: string): Observable<Course | undefined> {
    return of(DUMMY_COURSES.find(course => course.id === id));
  }
} 