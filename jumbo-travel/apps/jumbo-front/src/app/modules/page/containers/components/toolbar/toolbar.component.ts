import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: 'jumbo-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Output()
  burgerClicked: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  clickBurger() {
    this.burgerClicked.emit();
  }

}
