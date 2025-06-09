import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { Video } from '../../services/video.service';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="video-container">
      <div class="aspect-w-16 aspect-h-9">
        <video
          #videoPlayer
          class="video-js vjs-big-play-centered vjs-theme-city"
          controls
          preload="auto"
          width="100%"
          height="100%"
        >
          <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that supports HTML5 video
          </p>
        </video>
      </div>
      @if (video) {
        <div class="mt-4">
          <h2 class="text-xl font-semibold text-gray-900">{{ video.title }}</h2>
          <p class="mt-2 text-gray-600">{{ video.description }}</p>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .video-container {
      @apply bg-black rounded-lg overflow-hidden;
    }
    :host ::ng-deep .video-js {
      @apply w-full h-full;
    }
    :host ::ng-deep .vjs-big-play-button {
      @apply bg-indigo-600 border-indigo-600;
    }
    :host ::ng-deep .vjs-big-play-button:hover {
      @apply bg-indigo-700 border-indigo-700;
    }
  `]
})
export class VideoPlayerComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('videoPlayer') videoPlayerElement!: ElementRef;
  @Input() video?: Video;

  private player?: any; // Using any for now since the type definition is not working correctly

  constructor() {}

  ngOnInit() {
    this.initializePlayer();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['video'] && this.player) {
      this.updateVideoSource();
    }
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

  private initializePlayer() {
    this.player = videojs(this.videoPlayerElement.nativeElement, {
      fluid: true,
      responsive: true,
      playbackRates: [0.5, 1, 1.5, 2],
      controlBar: {
        children: [
          'playToggle',
          'volumePanel',
          'progressControl',
          'currentTimeDisplay',
          'timeDivider',
          'durationDisplay',
          'playbackRateMenuButton',
          'fullscreenToggle'
        ]
      }
    });

    this.updateVideoSource();
  }

  private updateVideoSource() {
    if (this.player && this.video) {
      this.player.src({
        src: this.video.videoUrl,
        type: 'video/mp4'
      });
      this.player.load();
    }
  }
} 