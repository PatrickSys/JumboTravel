import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from "@angular/core";
import { MatDrawerMode, MatSidenav } from "@angular/material/sidenav";
import { Router } from "@angular/router";
import { EventsManagerService } from "@jumbo/core";
import { Events } from "../../../../../../../../libs/core/src/lib/core/modules/events/events.enum";
import { AppConfig } from "@nrwl/angular/src/utils/nx-devkit/testing";
import {
  AppConfigService
} from "../../../../../../../../libs/core/src/lib/core/shared/services/config/app-config.service";
@Component({
  selector: 'jumbo-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {

  @Input()
  sideNavMode: MatDrawerMode = 'over'

  @ViewChild('sideNav') sideNav: MatSidenav | undefined;

  isAssistant: boolean = false;

  constructor(private router: Router, private eventsManager: EventsManagerService,
              private appConfig: AppConfigService) {}

  ngOnInit(): void {
    this.appConfig.employeeRole$.subscribe((role: string) => {
      this.isAssistant = role === 'assistant';
    })
  }

  navigateToDashboard(): void {
    this.toggleSideNav();
    if(this.isAssistant) {
      this.eventsManager.sendEvent({ name: Events.navigateAssistantDB })
    }
    else {
      this.eventsManager.sendEvent({ name: Events.navigateRestockerDB })
    }
  }
  navigateToOrders(): void {
    this.toggleSideNav();
    this.eventsManager.sendEvent({ name: Events.navigateOrders })
  }


  toggleSideNav(): void {
    this.sideNav?.toggle();
  }
}
