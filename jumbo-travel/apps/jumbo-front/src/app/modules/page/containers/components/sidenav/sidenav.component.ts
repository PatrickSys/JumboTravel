import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: 'jumbo-travel-side',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {

  @Output()
  burgerClicked: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  clickBurger() {
    this.burgerClicked.emit();
  }
}
