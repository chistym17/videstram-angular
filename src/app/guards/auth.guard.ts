import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.state$.pipe(
    take(1),
    map(authState => {
      if (authState.isAuthenticated) {
        return true;
      }

      // Store the attempted URL for redirecting after login
      router.navigate(['/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    })
  );
}; 