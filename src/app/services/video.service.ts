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