import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { Video } from '../../services/video.service';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="video-container bg-black rounded-lg overflow-hidden">
      <div class="aspect-w-16 aspect-h-9">
        <video
          #videoPlayer
          class="video-js vjs-big-play-centered vjs-theme-city"
          controls
          preload="auto"
          width="100%"
          height="100%"
          autoplay
          muted
        >
          <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that supports HTML5 video
          </p>
        </video>
      </div>
      @if (video) {
        <div class="mt-4 p-4 bg-white">
          <h2 class="text-xl font-semibold text-gray-900">{{ video.title }}</h2>
          <p class="mt-2 text-gray-600">{{ video.description }}</p>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    .video-container {
      @apply shadow-lg;
    }
    :host ::ng-deep .video-js {
      @apply w-full h-full;
    }
    :host ::ng-deep .vjs-big-play-button {
      @apply bg-indigo-600 border-indigo-600;
      @apply transform scale-125;
    }
    :host ::ng-deep .vjs-big-play-button:hover {
      @apply bg-indigo-700 border-indigo-700;
    }
    :host ::ng-deep .vjs-control-bar {
      @apply bg-black bg-opacity-75;
    }
  `]
})
export class VideoPlayerComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('videoPlayer') videoPlayerElement!: ElementRef;
  @Input() video?: Video;

  private player?: any;
  private isPlayerInitialized = false;

  constructor() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializePlayer();
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['video'] && this.isPlayerInitialized && this.player) {
      this.updateVideoSource();
    }
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
      this.isPlayerInitialized = false;
    }
  }

  private initializePlayer() {
    if (!this.videoPlayerElement?.nativeElement) {
      console.warn('Video player element not found');
      return;
    }

    try {
      this.player = videojs(this.videoPlayerElement.nativeElement, {
        fluid: true,
        responsive: true,
        autoplay: true,
        muted: true,
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

      this.isPlayerInitialized = true;

      this.player.ready(() => {
        if (this.video) {
          this.updateVideoSource();
        }
        this.player.play().catch((error: any) => {
          console.log('Autoplay failed:', error);
        });
      });
    } catch (error) {
      console.error('Error initializing video player:', error);
    }
  }

  private updateVideoSource() {
    if (!this.player || !this.video) return;

    try {
      this.player.src({
        src: this.video.videoUrl,
        type: 'video/mp4'
      });
      this.player.load();
      
      this.player.one('loadeddata', () => {
        this.player.play().catch((error: any) => {
          console.log('Autoplay after source update failed:', error);
        });
      });
    } catch (error) {
      console.error('Error updating video source:', error);
    }
  }
} 