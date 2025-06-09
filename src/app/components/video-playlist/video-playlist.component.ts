import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Video } from '../../services/video.service';

@Component({
  selector: 'app-video-playlist',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="p-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Course Content</h3>
        <p class="text-sm text-gray-600 mt-1">{{ videos.length }} lessons</p>
      </div>

      <div class="divide-y divide-gray-200 max-h-[calc(100vh-200px)] overflow-y-auto">
        @for (video of videos; track video.id) {
          <button
            (click)="selectVideo(video)"
            [class.bg-indigo-50]="video.id === selectedVideoId"
            class="w-full p-4 hover:bg-gray-50 transition-colors duration-200 flex items-start space-x-4 focus:outline-none"
          >
            <div class="relative flex-shrink-0 w-32 h-20 rounded-md overflow-hidden">
              <img
                [src]="video.thumbnail"
                [alt]="video.title"
                class="w-full h-full object-cover"
              >
              <div class="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                {{ video.duration }}
              </div>
              @if (video.isCompleted) {
                <div class="absolute inset-0 bg-green-500 bg-opacity-50 flex items-center justify-center">
                  <i class="fas fa-check text-white"></i>
                </div>
              }
            </div>

            <div class="flex-1 min-w-0 text-left">
              <h4 class="text-sm font-medium text-gray-900 line-clamp-2">
                {{ video.title }}
              </h4>
              <p class="mt-1 text-sm text-gray-500 line-clamp-2">
                {{ video.description }}
              </p>
            </div>
          </button>
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
export class VideoPlaylistComponent {
  @Input() videos: Video[] = [];
  @Input() selectedVideoId?: string;
  @Output() videoSelected = new EventEmitter<Video>();

  selectVideo(video: Video) {
    this.videoSelected.emit(video);
  }
} 