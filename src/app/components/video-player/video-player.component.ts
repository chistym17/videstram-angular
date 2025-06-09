import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { Video } from '../../services/video.service';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- NoScript Warning -->
    <noscript>
      <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">JavaScript Required</h3>
            <div class="mt-2 text-sm text-red-700">
              <p>This video player requires JavaScript to be enabled. Please enable JavaScript in your browser settings to continue.</p>
            </div>
          </div>
        </div>
      </div>
    </noscript>

    <!-- Video Player Container -->
    <div class="video-container bg-black rounded-lg overflow-hidden relative" 
         (contextmenu)="onRightClick($event)"
         (keydown)="onKeyDown($event)">
      <!-- Security Overlay -->
      <div class="absolute inset-0 pointer-events-none z-10" 
           (contextmenu)="onRightClick($event)"
           (selectstart)="onSelectStart($event)"
           (dragstart)="onDragStart($event)">
      </div>

      <!-- Video Wrapper -->
      <div class="video-wrapper">
        <video
          #videoPlayer
          class="video-js vjs-big-play-centered vjs-theme-city"
          controls
          preload="auto"
          autoplay
          muted
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
        >
          <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that supports HTML5 video
          </p>
        </video>
      </div>

      <!-- Security Notice -->
      <div class="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded pointer-events-none">
        Protected Content
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
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }

    .video-container {
      @apply shadow-lg;
      width: 100%;
      max-width: 100%;
      margin: 0 auto;
    }

    .video-wrapper {
      position: relative;
      width: 100%;
      padding-top: 56.25%; /* 16:9 Aspect Ratio */
      background: #000;
      overflow: hidden;
    }

    .video-wrapper video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    :host ::ng-deep .video-js {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      max-width: 100% !important;
      max-height: 100% !important;
    }

    :host ::ng-deep .vjs-tech {
      object-fit: contain !important;
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

    /* Disable video.js download button */
    :host ::ng-deep .vjs-download-button {
      display: none !important;
    }

    /* Ensure controls stay within container */
    :host ::ng-deep .vjs-control-bar {
      position: absolute !important;
      bottom: 0 !important;
      left: 0 !important;
      right: 0 !important;
      width: 100% !important;
    }
  `]
})
export class VideoPlayerComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('videoPlayer') videoPlayerElement!: ElementRef;
  @Input() video?: Video;

  private player?: any;
  private isPlayerInitialized = false;

  constructor() {
    document.addEventListener('contextmenu', this.onRightClick.bind(this));
    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

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
    document.removeEventListener('contextmenu', this.onRightClick.bind(this));
    document.removeEventListener('keydown', this.onKeyDown.bind(this));
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent): boolean {
    event.preventDefault();
    return false;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const forbiddenKeys = [
      'F12', 
      'Ctrl+Shift+I', 
      'Ctrl+Shift+J', 
      'Ctrl+Shift+C', 
      'Ctrl+U', 
      'Ctrl+S', 
      'Ctrl+P', 
      'PrintScreen' 
    ];

    if (forbiddenKeys.includes(event.key) || 
        (event.ctrlKey && event.shiftKey) || 
        (event.ctrlKey && event.key === 'u')) {
      event.preventDefault();
    }
  }

  @HostListener('selectstart', ['$event'])
  onSelectStart(event: Event): boolean {
    event.preventDefault();
    return false;
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: Event): boolean {
    event.preventDefault();
    return false;
  }

  private initializePlayer() {
    if (!this.videoPlayerElement?.nativeElement) {
      console.warn('Video player element not found');
      return;
    }

    try {
      this.player = videojs(this.videoPlayerElement.nativeElement, {
        fluid: false,
        responsive: true,
        autoplay: true,
        muted: true,
        playbackRates: [0.5, 1, 1.5, 2],
        aspectRatio: '16:9',
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
        },
        html5: {
          nativeVideoTracks: true,
          nativeAudioTracks: true,
          nativeTextTracks: true
        }
      });

      this.player.ready(() => {
        this.player.el().addEventListener('contextmenu', (e: Event) => e.preventDefault());
        
        this.player.pictureInPicture = () => false;
        
        this.player.controlBar.removeChild('DownloadButton');
        
        if (this.video) {
          this.updateVideoSource();
        }
        this.player.play().catch((error: any) => {
          console.log('Autoplay failed:', error);
        });
      });

      this.isPlayerInitialized = true;
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