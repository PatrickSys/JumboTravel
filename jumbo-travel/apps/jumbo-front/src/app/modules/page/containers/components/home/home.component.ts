import { Component, OnInit } from '@angular/core';
import { EmployeeInterface } from '@jumbo/core';
import { AppConfigService } from 'libs/core/src/lib/core/shared/services/config/app-config.service';
import { EmployeesService } from "../../../../dashboard/services/employees.service";
import { Router } from "@angular/router";

@Component({
  selector: 'jumbo-travel-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  employeeData: EmployeeInterface;

  constructor(private employeesService: EmployeesService, private appConfig: AppConfigService,
              private router: Router) {

  }

  ngOnInit(): void {
    if(this.appConfig.loginUser)
    this.employeesService.findEmployeeByidentifier(this.appConfig.loginUser).subscribe((employee: EmployeeInterface) => {
      this.employeeData = employee;
    })
  }

  navigateAssistantDB(): void {
    this.router.navigate(['/assistant']);
  }
  navigateOrders(): void {
    this.router.navigate(['/orders']);
  }
  navigateRestockerDB(): void {
    this.router.navigate(['/restocker']);

  }
}
