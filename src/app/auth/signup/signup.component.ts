import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>Create Account</h1>
          <p>Join our learning community today</p>
        </div>

        <form (ngSubmit)="onSubmit()" #signupForm="ngForm" class="auth-form">
          <div class="form-group">
            <label for="name">Full Name</label>
            <div class="input-wrapper">
              <i class="fas fa-user"></i>
              <input
                type="text"
                id="name"
                name="name"
                [(ngModel)]="name"
                required
                minlength="2"
                #nameInput="ngModel"
                placeholder="Enter your full name"
                [class.error]="nameInput.invalid && nameInput.touched"
              >
            </div>
            <div class="error-message" *ngIf="nameInput.invalid && nameInput.touched">
              Please enter your full name
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <div class="input-wrapper">
              <i class="fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                name="email"
                [(ngModel)]="email"
                required
                email
                #emailInput="ngModel"
                placeholder="Enter your email"
                [class.error]="emailInput.invalid && emailInput.touched"
              >
            </div>
            <div class="error-message" *ngIf="emailInput.invalid && emailInput.touched">
              Please enter a valid email address
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-wrapper">
              <i class="fas fa-lock"></i>
              <input
                [type]="showPassword ? 'text' : 'password'"
                id="password"
                name="password"
                [(ngModel)]="password"
                required
                minlength="6"
                #passwordInput="ngModel"
                placeholder="Create a password"
                [class.error]="passwordInput.invalid && passwordInput.touched"
              >
              <button 
                type="button" 
                class="toggle-password"
                (click)="showPassword = !showPassword">
                <i class="fas" [class]="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
              </button>
            </div>
            <div class="error-message" *ngIf="passwordInput.invalid && passwordInput.touched">
              Password must be at least 6 characters
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <div class="input-wrapper">
              <i class="fas fa-lock"></i>
              <input
                [type]="showPassword ? 'text' : 'password'"
                id="confirmPassword"
                name="confirmPassword"
                [(ngModel)]="confirmPassword"
                required
                #confirmPasswordInput="ngModel"
                placeholder="Confirm your password"
                [class.error]="confirmPasswordInput.invalid && confirmPasswordInput.touched"
              >
            </div>
            <div class="error-message" *ngIf="confirmPasswordInput.invalid && confirmPasswordInput.touched">
              Passwords do not match
            </div>
          </div>

          <div class="form-options">
            <label class="terms">
              <input 
                type="checkbox" 
                [(ngModel)]="agreeToTerms" 
                name="agreeToTerms"
                required
                #termsInput="ngModel">
              <span>I agree to the <a href="#" class="terms-link">Terms of Service</a> and <a href="#" class="terms-link">Privacy Policy</a></span>
            </label>
          </div>

          <button 
            type="submit" 
            class="btn btn-primary" 
            [disabled]="signupForm.invalid || isLoading || !passwordsMatch()">
            <i class="fas" [class]="isLoading ? 'fa-spinner fa-spin' : 'fa-user-plus'"></i>
            {{ isLoading ? 'Creating Account...' : 'Create Account' }}
          </button>
        </form>

        <div class="auth-footer">
          <p>Already have an account? <a routerLink="/login">Sign in</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: linear-gradient(135deg, #ffffff 0%, #dbeafe 50%, #e0e7ff 100%);
    }

    .auth-card {
      background: white;
      padding: 2.5rem;
      border-radius: 1rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      width: 100%;
      max-width: 400px;
    }

    .auth-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .auth-header h1 {
      font-size: 1.875rem;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .auth-header p {
      color: #6b7280;
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group label {
      font-weight: 500;
      color: #374151;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-wrapper i {
      position: absolute;
      left: 1rem;
      color: #9ca3af;
    }

    .input-wrapper input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      font-size: 1rem;
      transition: all 0.2s ease;
    }

    .input-wrapper input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .input-wrapper input.error {
      border-color: #ef4444;
    }

    .toggle-password {
      position: absolute;
      right: 1rem;
      background: transparent;
      border: none;
      color: #9ca3af;
      cursor: pointer;
      padding: 0.25rem;
    }

    .toggle-password:hover {
      color: #6b7280;
    }

    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
    }

    .form-options {
      font-size: 0.875rem;
    }

    .terms {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      color: #6b7280;
    }

    .terms input[type="checkbox"] {
      width: 1rem;
      height: 1rem;
      margin-top: 0.25rem;
      border-radius: 0.25rem;
      border: 1px solid #d1d5db;
    }

    .terms-link {
      color: #3b82f6;
      text-decoration: none;
    }

    .terms-link:hover {
      text-decoration: underline;
    }

    .btn {
      width: 100%;
      padding: 0.75rem;
      border-radius: 0.5rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.2s ease;
      border: none;
      cursor: pointer;
    }

    .btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .btn-primary {
      background: linear-gradient(90deg, #2563eb, #4f46e5);
      color: white;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(59, 130, 246, 0.3);
    }

    .auth-footer {
      margin-top: 2rem;
      text-align: center;
      color: #6b7280;
    }

    .auth-footer a {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 500;
    }

    .auth-footer a:hover {
      text-decoration: underline;
    }

    @media (max-width: 640px) {
      .auth-card {
        padding: 1.5rem;
      }
    }
  `]
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  agreeToTerms = false;
  showPassword = false;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  async onSubmit() {
    if (this.isLoading || !this.passwordsMatch()) return;

    this.isLoading = true;
    try {
      await this.authService.signup(this.email, this.password, this.name);
      this.toastService.success('Account created successfully!');
      this.router.navigate(['/']);
    } catch (error) {
      this.toastService.error('Signup failed. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }
} 