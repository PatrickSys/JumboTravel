import { Component, OnInit} from "@angular/core";
import { MatDrawerMode } from "@angular/material/sidenav";
import { AuthService } from "../../../auth/services/auth.service";
import {
  AppConfigService
} from "../../../../../../../../libs/core/src/lib/core/shared/services/config/app-config.service";
import { Logger } from "@nestjs/common";
import { Router } from "@angular/router";

@Component({
  selector: 'jumbo-travel-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {

  sideNavMode: MatDrawerMode = 'over';

  constructor(private authService: AuthService, private appConfig: AppConfigService, private router: Router) {}

  ngOnInit(): void {
    this.appConfig.userName = this.authService.userName;
    this.router.navigate(['/assistant'])
  }

  logOut() {
    this.authService.listenLogOutEvent();
  }
}
