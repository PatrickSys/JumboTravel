import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: 'jumbo-travel-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @Output()
  private logOutEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {

  }

  logOut(): void {
    this.logOutEvent.emit();
  }

}

