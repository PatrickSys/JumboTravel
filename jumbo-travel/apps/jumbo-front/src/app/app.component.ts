import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'jumbo-travel-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'jumbo-front';

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    console.warn('called twice');
  }
}
