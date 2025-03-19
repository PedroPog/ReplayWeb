import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ){
    router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .pipe(map(() => activatedRoute))
    .pipe(
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
    )
    .pipe(switchMap((route) => route.data))
    .subscribe((event) => {
      const d1 = event['titulo'];
      const d2 = `Portal - ${d1}`;
      titleService.setTitle(d2);
    });
  }

}
