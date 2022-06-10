import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from "rxjs";
import { Events } from "../events.enum";
import { EventsInterface } from '../interfaces/events-interface';

@Injectable({
  providedIn: 'root'
})
export class EventsManagerService {


  private eventsSubject: Subject<any> = new Subject();
  private events$: Observable<any> = this.eventsSubject.asObservable();
  events = Events;

  constructor() {}


  listenEvent(name: Events, callback: Function): void {
    this.events$.pipe(filter( (ev: EventsInterface) => ev.name === name))
      .subscribe( () => {
        callback();
      });
  }

  sendEvent(eventData: any): void {
    this.eventsSubject.next(eventData);
  }

  get eventsType() {
    return this.events;
  }
}
