import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EventService} from "../../services/event.service";
import { Event } from "../../data/event";

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
  event!: Event;
  eventImageUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.getEvent(eventId);
    }
  }

  getEvent(id: string): void {
    this.eventService.getById(id).subscribe((event: Event) => {
      this.event = event;
      this.eventImageUrl = "'assets/' + event.category.name + '.jpg'";
    });
  }
}
