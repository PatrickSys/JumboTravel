import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'jumbo-travel-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'jumbo-front';

  _isLoggedIn: boolean = this.authService.isLoggedIn;

  constructor(private authService: AuthService) {

    console.log(window.location);

    this.authService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this._isLoggedIn = isLoggedIn;
    });
  }

  ngOnInit() {

  }

  get isLoggedIn(): boolean {
    return <boolean>this._isLoggedIn;
  }
}
