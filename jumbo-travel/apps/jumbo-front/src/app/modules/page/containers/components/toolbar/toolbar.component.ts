import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { EventsManagerService } from "@jumbo/core";
import { Events } from "../../../../../../../../../libs/core/src/lib/core/events/events.enum";

@Component({
  selector: 'jumbo-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  @Output()
  burgerClicked: EventEmitter<any> = new EventEmitter();



  constructor(private eventsManager: EventsManagerService) {}

  ngOnInit(): void {

  }

  logOut(): void {
    console.log('ha');
    this.eventsManager.sendEvent(Events.logOut);
  }

  clickBurger() {
    this.burgerClicked.emit();
  }
}


