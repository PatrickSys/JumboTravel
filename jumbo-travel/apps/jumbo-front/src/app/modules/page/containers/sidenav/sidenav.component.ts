import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { MatDrawerMode, MatSidenav } from "@angular/material/sidenav";
import { Router } from "@angular/router";

@Component({
  selector: 'jumbo-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {

  @Input()
  sideNavMode: MatDrawerMode = 'over'

  @ViewChild('sideNav') sideNav: MatSidenav | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateAssistant(): void {
    this.toggleSideNav();
    this.router.navigateByUrl('/assistant');
  }

  toggleSideNav(): void {
    this.sideNav?.toggle();
  }
}
