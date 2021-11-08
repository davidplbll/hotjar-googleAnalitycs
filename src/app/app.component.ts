import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '@env';
declare var gtag;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'analytics';
  constructor(private router: Router) {
    const navEndEvents$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    );

    navEndEvents$.subscribe({
      next: (event: NavigationEnd) => {
        gtag('config', environment.googleAnalytics, {
          page_path: event.urlAfterRedirects,
        });
      },
    });
  }
}
