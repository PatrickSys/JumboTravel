import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { EventsInterface } from "../interfaces/events-interface";
import { Events } from "../events.enum";

@Injectable({
  providedIn: 'root'
})
export class EventsManagerService {


  private listeners: any;
  private eventsSubject: any;
  private events: Observable<EventsInterface>;

  constructor() {
    this.listeners = {};
    this.eventsSubject = new Subject();

    this.events = this.eventsSubject.asObservable();
    this.events.subscribe(({name, args}: any) => {

      if (this.listeners[name]) {
        for (let listener of this.listeners[name]) {
          listener(...args);
        }
      }
    });
  }


  listenEvent(name: Events, listener: any): void {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }

    this.listeners[name].push(listener);
  }


  sendEvent(name: Events, ...args: Array<any>): void {
    this.eventsSubject.next({
      name,
      args
    });
  }

  destroyListener(name: string, listener: any): void {
    if (this.listeners[name] && this.listeners[name].indexOf(listener) > -1) {
      this.listeners[name].splice(this.listeners[name].indexOf(listener), 1);
    }
  }
}
