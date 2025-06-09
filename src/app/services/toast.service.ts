import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toasts.asObservable();
  private id = 0;

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const toast: Toast = {
      id: this.id++,
      message,
      type
    };

    this.toasts.next([...this.toasts.value, toast]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      this.remove(toast.id);
    }, 3000);
  }

  remove(id: number) {
    this.toasts.next(this.toasts.value.filter(t => t.id !== id));
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  info(message: string) {
    this.show(message, 'info');
  }
} 