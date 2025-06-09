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

    <!-- Fixed Size Container -->
    <div class="fixed-container">
      <!-- Loading State -->
      @if (isLoading) {
        <div class="loading-overlay">
          <div class="loading-spinner"></div>
          <p class="loading-text">Loading video player...</p>
        </div>
      }

      <!-- Video Player -->
      <div class="video-player-wrapper" [class.hidden]="isLoading">
        <video
          #videoPlayer
          class="video-js vjs-default-skin"
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
    </div>

    <!-- Video Info Section - Outside fixed container -->
    @if (video) {
      <div class="video-info">
        <h2 class="text-xl font-semibold text-gray-900">{{ video.title }}</h2>
        <p class="mt-1 text-gray-600">{{ video.description }}</p>
      </div>
    }
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

    .fixed-container {
      width: 100%;
      max-width: 800px;
      height: 450px;
      margin: 0 auto;
      position: relative;
      background: #000;
      border-radius: 0.5rem;
      overflow: hidden;
    }

    .video-player-wrapper {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      transition: opacity 0.3s ease;
    }

    .video-player-wrapper.hidden {
      opacity: 0;
    }

    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.8);
      z-index: 10;
    }

    .loading-spinner {
      width: 50px;
      height: 50px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid #6366f1;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }

    .loading-text {
      color: white;
      font-size: 1rem;
      font-weight: 500;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Video Info Section */
    .video-info {
      margin-top: 1rem;
      padding: 0 1rem;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }

    /* Basic Video.js Styles - Using default skin */
    :host ::ng-deep .video-js {
      width: 100% !important;
      height: 100% !important;
      background: #000 !important;
      border-radius: 0.5rem;
      overflow: hidden;
      font-family: inherit;
    }

    :host ::ng-deep .video-js.vjs-default-skin {
      font-size: 10px;
      color: #fff;
    }

    :host ::ng-deep .vjs-tech {
      object-fit: contain !important;
      width: 100% !important;
      height: 100% !important;
    }

    /* Ensure controls are always visible and functional */
    :host ::ng-deep .vjs-control-bar {
      display: flex !important;
      visibility: visible !important;
      opacity: 1 !important;
      position: absolute !important;
      bottom: 0 !important;
      left: 0 !important;
      right: 0 !important;
      height: 3.0em !important;
      background-color: rgba(7, 20, 30, 0.7) !important;
    }

    /* Make sure all default controls are visible */
    :host ::ng-deep .vjs-control-bar > * {
      display: flex !important;
      visibility: visible !important;
      opacity: 1 !important;
    }

    /* Play/Pause button */
    :host ::ng-deep .vjs-play-control {
      order: 1;
    }

    /* Volume controls */
    :host ::ng-deep .vjs-volume-panel {
      order: 2;
    }

    /* Progress bar */
    :host ::ng-deep .vjs-progress-control {
      flex: auto;
      order: 3;
    }

    /* Time display */
    :host ::ng-deep .vjs-time-control {
      order: 4;
    }

    /* Fullscreen button */
    :host ::ng-deep .vjs-fullscreen-control {
      order: 5;
    }

    /* Hide download button completely */
    :host ::ng-deep .vjs-download-button {
      display: none !important;
    }

    /* Ensure player responsiveness */
    @media (max-width: 768px) {
      .fixed-container {
        height: 250px;
        margin: 0 1rem;
      }
      
      :host ::ng-deep .vjs-control-bar {
        height: 2.5em !important;
      }
    }
  `]
})
export class VideoPlayerComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('videoPlayer') videoPlayerElement!: ElementRef;
  @Input() video?: Video;

  private player?: any;
  private isPlayerInitialized = false;
  isLoading = true;

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
      this.isLoading = true;
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
        responsive: false,
        autoplay: true,
        muted: true,
        controls: true,
        playbackRates: [0.5, 1, 1.5, 2],
        controlBar: {
          children: [
            'playToggle',
            'volumePanel',
            'playbackRateMenuButton',
            'fullscreenToggle'
          ]
        },
        html5: {
          nativeVideoTracks: true,
          nativeAudioTracks: true,
          nativeTextTracks: true,
          hls: {
            overrideNative: true
          }
        },
        inactivityTimeout: 0, 
        userActions: {
          hotkeys: true,
          doubleClick: true
        }
      });

      this.player.ready(() => {
        this.player.controls(true);
        
        const controlBar = this.player.controlBar;
        if (controlBar) {
          controlBar.show();
          controlBar.addClass('vjs-control-bar-permanent');
        }

        this.player.el().addEventListener('contextmenu', (e: Event) => e.preventDefault());
        this.player.pictureInPicture = () => false;
        
        try {
          this.player.controlBar.removeChild('DownloadButton');
        } catch (e) {
        }
        
        if (this.video) {
          this.updateVideoSource();
        }

        this.player.one('loadeddata', () => {
          this.isLoading = false;
          this.isPlayerInitialized = true;
        });

        this.player.on('error', () => {
          this.isLoading = true;
        });

        this.player.play().catch((error: any) => {
          console.log('Autoplay failed:', error);
          this.isLoading = false;
        });
      });

    } catch (error) {
      console.error('Error initializing video player:', error);
      this.isLoading = false;
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
        this.isLoading = false;
        this.player.play().catch((error: any) => {
          console.log('Autoplay after source update failed:', error);
          this.isLoading = false;
        });
      });

      this.player.on('error', () => {
        this.isLoading = true;
      });
    } catch (error) {
      console.error('Error updating video source:', error);
      this.isLoading = false;
    }
  }
}