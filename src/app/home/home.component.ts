import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FeaturedCoursesComponent } from '../components/featured-courses/featured-courses.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FeaturedCoursesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  stats = {
    students: '50,000+',
    rating: '4.9/5'
  };

  startWatching() {
    console.log('Starting to watch...');
  }

  browseCourses() {
    console.log('Browsing courses...');
  }

  playVideo() {
    console.log('Playing video preview...');
  }
}