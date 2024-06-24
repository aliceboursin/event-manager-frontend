import { Component, Input } from "@angular/core";
import { Event } from "../../data/event";
import {Router} from "@angular/router";

@Component({
    selector: 'app-event-list-item',
    templateUrl: './event-list-item-component.html',
    styleUrls: ['./event-list-item.component.css']
})
export class EventListItemComponent {
    @Input()
    event!: Event;

  constructor(private router: Router) {}

  goToEventPage(eventId: string): void {
    this.router.navigate([`/events/${eventId}`]);
  }
}
