import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from "../../data/event";
import { EventService } from "../../services/event.service";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  events: Event[] = [];
  query: string = '';

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
      this.searchEvents();
    });
  }

  searchEvents(): void {
    this.eventService.search(this.query).subscribe((events: Event[]) => {
      this.events = events;
    });
  }
}
