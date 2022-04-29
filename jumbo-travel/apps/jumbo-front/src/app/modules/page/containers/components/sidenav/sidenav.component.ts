import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from "@angular/core";
import { MatDrawerMode, MatSidenav } from "@angular/material/sidenav";

@Component({
  selector: 'jumbo-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {

  @Input()
  sideNavMode: MatDrawerMode = 'push'

  @Output()
  burgerClicked: EventEmitter<any> = new EventEmitter();

  @ViewChild('sideNav') sidenavRef: MatSidenav | undefined

  constructor() {}

  ngOnInit(): void {}

  openSideNav() {

    this.sidenavRef?.toggle().then(() => {
      console.log(this.sideNavMode);
    })

    this.burgerClicked.emit();
  }

}
