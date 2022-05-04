import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../auth/services/auth.service";
import { MatDrawerMode } from "@angular/material/sidenav";

@Component({
  selector: 'jumbo-travel-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {

  sideNavMode: MatDrawerMode = 'side';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  handleLogin() {
   // this.sideNavMode = 'over';
     this.authService.login();
  }

}
