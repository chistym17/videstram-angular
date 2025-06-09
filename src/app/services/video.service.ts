import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  courseId: string;
  order: number;
  isCompleted?: boolean;
}

// Dummy video data
const DUMMY_VIDEOS: Video[] = [
  // Math 101 videos
  {
    id: 'video-1',
    title: 'Introduction to the Course',
    description: 'Get an overview of what you will learn in this course.',
    duration: '10:30',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    courseId: 'math-101',
    order: 1
  },
  {
    id: 'video-2',
    title: 'Basic Concepts and Fundamentals',
    description: 'Learn the fundamental concepts that will be used throughout the course.',
    duration: '15:45',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    courseId: 'math-101',
    order: 2
  },
  {
    id: 'video-3',
    title: 'Advanced Topics and Applications',
    description: 'Dive deep into advanced topics and their real-world applications.',
    duration: '20:15',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    courseId: 'math-101',
    order: 3
  },
  {
    id: 'video-4',
    title: 'Practice Problems and Solutions',
    description: 'Work through practice problems with detailed solutions.',
    duration: '18:20',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    courseId: 'math-101',
    order: 4
  },
  {
    id: 'video-5',
    title: 'Course Summary and Next Steps',
    description: 'Review what you have learned and plan your next steps.',
    duration: '12:10',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    courseId: 'math-101',
    order: 5
  },

  // Physics 201 (Quantum Mechanics) videos from Cloudflare
  {
    id: 'physics-video-1',
    title: 'Introduction to Quantum Mechanics',
    description: 'An overview of quantum mechanics and its fundamental principles.',
    duration: '15:30',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format',
    videoUrl: 'https://pub-eb55c571432c4e44a453fa3f1d7edd5d.r2.dev/video3.mp4',
    courseId: 'physics-201',
    order: 1
  },
  {
    id: 'physics-video-2',
    title: 'Wave Functions and Probability',
    description: 'Understanding wave functions and their role in quantum probability.',
    duration: '18:45',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format',
    videoUrl: 'https://pub-eb55c571432c4e44a453fa3f1d7edd5d.r2.dev/video5.mp4',
    courseId: 'physics-201',
    order: 2
  },
  {
    id: 'physics-video-3',
    title: 'Quantum States and Superposition',
    description: 'Exploring quantum states and the principle of superposition.',
    duration: '20:00',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format',
    videoUrl: 'https://pub-eb55c571432c4e44a453fa3f1d7edd5d.r2.dev/SampleVideo_1280x720_2mb.mp4',
    courseId: 'physics-201',
    order: 3
  },
  {
    id: 'physics-video-4',
    title: 'Quantum Entanglement',
    description: 'Understanding the phenomenon of quantum entanglement and its implications.',
    duration: '22:15',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format',
    videoUrl: 'https://pub-eb55c571432c4e44a453fa3f1d7edd5d.r2.dev/video10.mp4',
    courseId: 'physics-201',
    order: 4
  }
];

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor() {}

  getVideosByCourseId(courseId: string): Observable<Video[]> {
    return of(DUMMY_VIDEOS.filter(video => video.courseId === courseId)
      .sort((a, b) => a.order - b.order));
  }

  getVideoById(videoId: string): Observable<Video | undefined> {
    return of(DUMMY_VIDEOS.find(video => video.id === videoId));
  }
} 