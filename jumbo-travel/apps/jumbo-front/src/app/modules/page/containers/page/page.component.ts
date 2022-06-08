import { Component, OnInit} from "@angular/core";
import { MatDrawerMode } from "@angular/material/sidenav";
import { AuthService } from "../../../auth/services/auth.service";
import {
  AppConfigService
} from "../../../../../../../../libs/core/src/lib/core/shared/services/config/app-config.service";
import { Logger } from "@nestjs/common";
import { Router } from "@angular/router";
import { EmployeesService } from "../../../dashboard/services/employees.service";
import { EmployeeInterface } from "@jumbo/core";
import { map } from "rxjs";
import { role } from "../../../../../../../../libs/core/src/lib/core/shared/types/roleTypes";

@Component({
  selector: 'jumbo-travel-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {

  sideNavMode: MatDrawerMode = 'over';

  constructor(private authService: AuthService, private appConfig: AppConfigService, private router: Router,
              private employeesService: EmployeesService) {}

  ngOnInit(): void {
    this.appConfig.userName = this.authService.userName;
    this.appConfig.loginUser = this.authService.loginUser;

    if(!this.appConfig.loginUser) return;
    this.employeesService.findEmployeeByidentifier(this.appConfig.loginUser).pipe(map((employee: EmployeeInterface) => employee.role))
      .subscribe((role: role) => {
      this.router.navigate([`/${role}`])
    });
  }

  logOut() {
    this.authService.listenLogOutEvent();
  }
}
