import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';
import { WebsiteService } from "@jumbo/core";

@Component({
  selector: 'jumbo-travel-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  private _isLoggedIn: boolean = this.authService.isLoggedIn;

  constructor(private authService: AuthService,
              private webService: WebsiteService) {
    this.authService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this._isLoggedIn = isLoggedIn;
    });
  }

  ngOnInit() {}

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }
}
