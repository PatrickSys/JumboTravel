import { Component, OnInit} from "@angular/core";
import { MatDrawerMode } from "@angular/material/sidenav";
import { AuthService } from "../../../auth/services/auth.service";

@Component({
  selector: 'jumbo-travel-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {

  sideNavMode: MatDrawerMode = 'over';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logOut() {
    this.authService.logoff();
  }
}
