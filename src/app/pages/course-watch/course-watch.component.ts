import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoPlayerComponent } from '../../components/video-player/video-player.component';
import { VideoPlaylistComponent } from '../../components/video-playlist/video-playlist.component';
import { Video, VideoService } from '../../services/video.service';
import { Course, CourseService } from '../../services/course.service';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-course-watch',
  standalone: true,
  imports: [CommonModule, VideoPlayerComponent, VideoPlaylistComponent],
  template: `
    <div class="min-h-screen bg-gray-100">
      <div class="container mx-auto px-4 py-8">
        <!-- Course Header -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-900">{{ course?.title }}</h1>
          <p class="mt-2 text-gray-600">{{ course?.description }}</p>
        </div>

        <!-- Main Content -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <!-- Video Player Section -->
          <div class="lg:col-span-3 flex justify-center">
            <div class="w-full max-w-4xl">
              @if (currentVideo) {
                <app-video-player [video]="currentVideo" />
              } @else {
                <div class="bg-white rounded-lg shadow-sm p-8 text-center">
                  <p class="text-gray-600">Select a video to start watching</p>
                </div>
              }
            </div>
          </div>

          <!-- Playlist Section -->
          <div class="lg:col-span-1">
            @if (videos.length > 0) {
              <app-video-playlist
                [videos]="videos"
                [selectedVideoId]="currentVideo?.id"
                (videoSelected)="onVideoSelected($event)"
              />
            } @else {
              <div class="bg-white rounded-lg shadow-sm p-8 text-center">
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
    // Get course ID from route params
    this.route.params.pipe(
      switchMap(params => {
        const courseId = params['id'];
        if (!courseId) return forkJoin([]);

        // Load both course details and videos in parallel
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
          
          // If there's a video ID in the URL, load that video
          this.route.queryParams.subscribe(queryParams => {
            const videoId = queryParams['video'];
            if (videoId) {
              const video = this.videos.find(v => v.id === videoId);
              if (video) {
                this.currentVideo = video;
              } else {
                // If video not found, select first video
                this.currentVideo = this.videos[0];
                this.updateUrl();
              }
            } else if (this.videos.length > 0) {
              // If no video ID in URL, select first video
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