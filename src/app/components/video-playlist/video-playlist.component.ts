import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Video } from '../../services/video.service';

@Component({
  selector: 'app-video-playlist',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="divide-y divide-gray-100">
      @for (video of videos; track video.id) {
        <button
          (click)="onVideoClick(video)"
          [class.bg-indigo-50]="video.id === selectedVideoId"
          class="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus:bg-gray-50"
        >
          <div class="flex items-start space-x-3">
            <!-- Thumbnail -->
            <div class="flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden bg-gray-100 relative">
              <img 
                [src]="video.thumbnail" 
                [alt]="video.title"
                class="w-full h-full object-cover"
              />
              <div class="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
                {{ formatDuration(video.duration) }}
              </div>
              @if (video.id === selectedVideoId) {
                <div class="absolute inset-0 bg-indigo-600 bg-opacity-20 flex items-center justify-center">
                  <svg class="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                  </svg>
                </div>
              }
            </div>

            <!-- Video Info -->
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-medium text-gray-900 line-clamp-2">
                {{ video.title }}
              </h3>
              <p class="mt-1 text-xs text-gray-500 line-clamp-2">
                {{ video.description }}
              </p>
            </div>
          </div>
        </button>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class VideoPlaylistComponent {
  @Input() videos: Video[] = [];
  @Input() selectedVideoId?: string;
  @Output() videoSelected = new EventEmitter<Video>();

  onVideoClick(video: Video) {
    this.videoSelected.emit(video);
  }

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
} 