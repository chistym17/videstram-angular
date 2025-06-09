import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CoursesComponent } from './courses/courses.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { 
    path: 'courses', 
    component: CoursesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'course/:id/watch',
    loadComponent: () => import('./pages/course-watch/course-watch.component').then(m => m.CourseWatchComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '' }
];
