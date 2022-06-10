import { Component, OnInit} from "@angular/core";
import { MatDrawerMode } from "@angular/material/sidenav";
import { AuthService } from "../../../auth/services/auth.service";
import {
  AppConfigService
} from "../../../../../../../../libs/core/src/lib/core/shared/services/config/app-config.service";
import { Logger } from "@nestjs/common";
import { Router } from "@angular/router";
import { EmployeesService } from "../../../dashboard/services/employees.service";
import { EmployeeInterface, EventsManagerService } from "@jumbo/core";
import { map } from "rxjs";
import { role } from "../../../../../../../../libs/core/src/lib/core/shared/types/roleTypes";
import { Events } from "../../../../../../../../libs/core/src/lib/core/modules/events/events.enum";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'jumbo-travel-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {

  sideNavMode: MatDrawerMode = 'over';
  employeeData: EmployeeInterface;

  constructor(private authService: AuthService, private appConfig: AppConfigService, private router: Router,
              private employeesService: EmployeesService,
              private eventsManager: EventsManagerService,
              private toastService: ToastrService) {}

  ngOnInit(): void {
    this.appConfig.userName = this.authService.userName;
    this.appConfig.loginUser = this.authService.loginUser;
    this.listenNavigateAssistant();
    this.listenNavigateOrders();
    this.listenNavigateRestockerDashboard();
    this.manageNotifications();

    if(!this.appConfig.loginUser) return;
    this.employeesService.findEmployeeByidentifier(this.appConfig.loginUser)
      .subscribe((employee: EmployeeInterface) => {
        this.employeeData = employee;
        this.appConfig.employeeRoleSubject.next(employee.role);
    });
  }

  logOut() {
    this.authService.listenLogOutEvent();
  }
  listenNavigateAssistant() {
    this.eventsManager.listenEvent(Events.navigateAssistantDB, this.navigateAssistantDashboard.bind(this))
  }
  navigateAssistantDashboard() {
    this.router.navigate(['/assistant'])
  }
  listenNavigateOrders() {
    this.eventsManager.listenEvent(Events.navigateOrders, this.navigateOrders.bind(this))
  }
  navigateOrders() {
    this.router.navigate(['/orders'])
  }
  listenNavigateRestockerDashboard() {
    console.log('restocker sosio');
    this.eventsManager.listenEvent(Events.navigateRestockerDB, this.navigateRestockerDB.bind(this))
  }
  navigateRestockerDB() {
    this.router.navigate(['/restocker'])
  }

  manageNotifications() {
    this.employeesService.listenOnNotifications().onmessage = ({ data }) => {
      const _data = JSON.parse(data);
        if (this.employeeData.role === 'assistant' , "", { progressBar: true }) {
        if(_data.assistantId === this.employeeData._id) {
          if(_data.status === 'Approved') {

            const orderId = _data._id;
            this.toastService.info(`Order with id ${orderId} has been approved`);
            this.eventsManager.sendEvent({name: Events.orderApproved})
          }
        }
        }
                 if(_data.destination === this.employeeData.base && this.employeeData.role !== 'assistant' ) {

           if(_data.status !== 'Approved') {
             const orderId = _data._id;
             this.eventsManager.sendEvent({name: Events.orderRequested})
             this.toastService.info(`Order with id ${orderId} has been requested`, "",{ progressBar: true })
               .onTap.subscribe(() => {
               this.navigateRestockerDB();
             });
           }
           }
    };
  }

}
