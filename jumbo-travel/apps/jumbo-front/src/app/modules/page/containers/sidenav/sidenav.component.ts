import { Component, Input, OnInit } from "@angular/core";
import { MatDrawerMode } from "@angular/material/sidenav";

@Component({
  selector: 'jumbo-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {

  @Input()
  sideNavMode: MatDrawerMode = 'over'


  constructor() {}

  ngOnInit(): void {}

}
