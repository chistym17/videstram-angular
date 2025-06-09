import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div *ngFor="let toast of toasts" 
           class="toast" 
           [class]="toast.type"
           [@fadeInOut]>
        <div class="toast-content">
          <i class="fas" [class]="getIcon(toast.type)"></i>
          <span>{{ toast.message }}</span>
        </div>
        <button class="toast-close" (click)="removeToast(toast.id)">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .toast {
      min-width: 300px;
      padding: 1rem;
      border-radius: 0.5rem;
      background: white;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      display: flex;
      align-items: center;
      justify-content: space-between;
      animation: slideIn 0.3s ease;
    }

    .toast-content {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .toast i {
      font-size: 1.25rem;
    }

    .toast.success {
      border-left: 4px solid #10b981;
    }

    .toast.success i {
      color: #10b981;
    }

    .toast.error {
      border-left: 4px solid #ef4444;
    }

    .toast.error i {
      color: #ef4444;
    }

    .toast.info {
      border-left: 4px solid #3b82f6;
    }

    .toast.info i {
      color: #3b82f6;
    }

    .toast-close {
      background: transparent;
      border: none;
      color: #6b7280;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 0.25rem;
      transition: all 0.2s ease;
    }

    .toast-close:hover {
      background: rgba(0, 0, 0, 0.05);
      color: #1f2937;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `]
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private subscription: Subscription;

  constructor(private toastService: ToastService) {
    this.subscription = this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeToast(id: number) {
    this.toastService.remove(id);
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success':
        return 'fa-check-circle';
      case 'error':
        return 'fa-exclamation-circle';
      default:
        return 'fa-info-circle';
    }
  }
} 