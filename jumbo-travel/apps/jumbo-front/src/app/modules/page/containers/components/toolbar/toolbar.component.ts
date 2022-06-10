import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { EventsManagerService } from "@jumbo/core";
import { Events } from "../../../../../../../../../libs/core/src/lib/core/modules/events/events.enum";

@Component({
  selector: 'jumbo-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  @Output()
  burgerClicked: EventEmitter<any> = new EventEmitter();



  constructor(private eventsManager: EventsManagerService,
              private router: Router) {}

  ngOnInit(): void {

  }

  logOut(): void {
    this.eventsManager.sendEvent({name: Events.logOut});
  }

  clickBurger() {
    this.burgerClicked.emit();
  }
  navigateHome(): void {
    this.router.navigate(['/home'])
  }
}


