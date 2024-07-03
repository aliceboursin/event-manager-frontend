import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from "../../data/event";
import { Location } from '@angular/common';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  query: string = '';
  allEvents: Event[] = [];
  filteredEvents: Event[] = [];

  constructor(private eventService: EventService, private location: Location) {}

  ngOnInit(): void {
    this.eventService.getAll().subscribe((events: Event[]) => {
      this.allEvents = events;
      this.filteredEvents = events;
    });
  }

  onSearch(query: string): void {
    this.query = query.toLowerCase();
    this.filteredEvents = this.allEvents.filter(event =>
      event.title.toLowerCase().includes(this.query) ||
      event.city.toLowerCase().includes(this.query) ||
      event.category.name.toLowerCase().includes(this.query) ||
      event.owner.username.toLowerCase().includes(this.query) ||
      event.description.toLowerCase().includes(this.query)
    );
  }

  goBack() {
    this.location.back();
  }
}
