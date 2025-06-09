import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoPlayerComponent } from '../../components/video-player/video-player.component';
import { VideoPlaylistComponent } from '../../components/video-playlist/video-playlist.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Video, VideoService } from '../../services/video.service';
import { Course, CourseService } from '../../services/course.service';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-course-watch',
  standalone: true,
  imports: [CommonModule, VideoPlayerComponent, VideoPlaylistComponent, NavbarComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Navbar -->
      <app-navbar />

      <!-- Main Content -->
      <div class="container mx-auto px-4 py-8">
        <!-- Course Header -->
        <div class="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h1 class="text-2xl font-bold text-gray-900">{{ course?.title }}</h1>
          <p class="mt-2 text-gray-600">{{ course?.description }}</p>
        </div>

        <!-- Demo Note -->
        <div class="mb-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-blue-800">Demo Mode</h3>
              <div class="mt-1 text-sm text-blue-700">
                <p>This is a demonstration version using sample videos. In the production environment, these will be replaced with actual course content.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Video Content -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <!-- Video Player Section -->
          <div class="lg:col-span-3">
            <div class="w-full max-w-4xl mx-auto">
              @if (currentVideo) {
                <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-xl">
                  <app-video-player [video]="currentVideo" />
                </div>
              } @else {
                <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
                  <p class="text-gray-600">Select a video to start watching</p>
                </div>
              }
            </div>
          </div>

          <!-- Playlist Section -->
          <div class="lg:col-span-1">
            @if (videos.length > 0) {
              <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden sticky top-6">
                <div class="p-4 border-b border-gray-100 bg-gray-50">
                  <h2 class="text-lg font-semibold text-gray-900">Course Content</h2>
                  <p class="text-sm text-gray-500 mt-1">{{ videos.length }} lessons</p>
                </div>
                <app-video-playlist
                  [videos]="videos"
                  [selectedVideoId]="currentVideo?.id"
                  (videoSelected)="onVideoSelected($event)"
                />
              </div>
            } @else {
              <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
                <p class="text-gray-600">No videos available</p>
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
export class CourseWatchComponent implements OnInit {
  course: Course | undefined;
  videos: Video[] = [];
  currentVideo?: Video;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private videoService: VideoService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        const courseId = params['id'];
        if (!courseId) return forkJoin([]);

        return forkJoin({
          course: this.courseService.getCourse(courseId),
          videos: this.videoService.getVideosByCourseId(courseId)
        });
      })
    ).subscribe({
      next: (result: any) => {
        if (result.course) {
          this.course = result.course;
        }
        if (result.videos) {
          this.videos = result.videos;
          
          this.route.queryParams.subscribe(queryParams => {
            const videoId = queryParams['video'];
            if (videoId) {
              const video = this.videos.find(v => v.id === videoId);
              if (video) {
                this.currentVideo = video;
              } else {
                this.currentVideo = this.videos[0];
                this.updateUrl();
              }
            } else if (this.videos.length > 0) {
              this.currentVideo = this.videos[0];
              this.updateUrl();
            }
          });
        }
      },
      error: (error) => {
        console.error('Error loading course data:', error);
      }
    });
  }

  onVideoSelected(video: Video) {
    this.currentVideo = video;
    this.updateUrl();
  }

  private updateUrl() {
    if (this.currentVideo) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { video: this.currentVideo.id },
        queryParamsHandling: 'merge'
      });
    }
  }
} 