import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  template: `<router-outlet></router-outlet>`,
  styles: []
})
export class AppComponent {
  title = 'course-dashboard';
}
