import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logged-in-home-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './logged-in-home-page.component.html',
  styleUrl: './logged-in-home-page.component.scss',
})
export class LoggedInHomePageComponent {}
