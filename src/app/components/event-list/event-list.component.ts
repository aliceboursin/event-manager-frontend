/*import { Component, OnInit } from "@angular/core";
import { Event } from "../../data/event";
import { EventService } from "../../services/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, Observable, of} from "rxjs";
import {HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-event-list',
    templateUrl:'./event-list.component.html',
    styleUrls: ['./event-list.component.css']
})

export class EventListComponent implements OnInit {
    events$: Observable<Event[]> | null = null;
    filteredEvents: Event[] = [];
    title: String = "";

    constructor(
      private eventService: EventService,
      private route: ActivatedRoute,
      private router: Router,
    ) {}

    ngOnInit(): void {
      // event list but with parameters. We give the category id to the route to get the events by category id
      if (this.route.snapshot.params.hasOwnProperty('category')) {
        console.log(this.route.snapshot.params['category']);
        this.loadEventPerCategory(this.route.snapshot.params['category']);
        this.title = "Explore By Categories";
      } else if (this.router.url === '/events/passed-events') {
        this.title = "Passed Events";
        console.log("passed events");
        this.loadPassedEvents();
      } else if (this.router.url === '/events/upcoming-events') {
        this.title = "Upcomming Events";
        console.log("upcoming events");
        this.loadUpcomingEvents();
      } else {
        this.title = "All Events";
        this.loadEvents();
      }
    }

    loadEvents(category: string | null = null): void {
      console.log(category);
      this.events$ = this.eventService.getAll()
        .pipe(
          catchError((error:HttpResponse<any>) => {
            console.log(error);
            return of([])
          })
        );
    }

    loadEventPerCategory(categoryId: string): void {
      this.events$ = this.eventService.getByCategoryId(categoryId)
        .pipe(
          catchError((error:HttpResponse<any>) => {
            console.log(error);
            return of([])
          })
        );
    }

    loadPassedEvents() {
      this.events$ = this.eventService.getPassedEvents()
        .pipe(
          catchError((error:HttpResponse<any>) => {
            console.log(error);
            return of([])
          })
        );
    }

    loadUpcomingEvents() {
      this.events$ = this.eventService.getUpcomingEvents()
        .pipe(
          catchError((error:HttpResponse<any>) => {
            console.log(error);
            return of([])
          })
        );
    }

    onFiltersApplied(filters: { category: string | null, city: string | null, date: Date | null }) {
      this.filteredEvents = this.filteredEvents.filter(event => {
        const matchesCategory = !filters.category || event.category.name === filters.category;
        const matchesCity = !filters.city || event.city === filters.city;
        const matchesDate = !filters.date || new Date(event.date).toDateString() === filters.date.toDateString();
        return matchesCategory && matchesCity && matchesDate;
      });
    }



}*/

import { Component, OnInit } from "@angular/core";
import { Event } from "../../data/event";
import { EventService } from "../../services/event.service";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, Observable, of } from "rxjs";
import { HttpResponse } from "@angular/common/http";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events$: Observable<Event[]> | null = null;
  allEvents: Event[] = [];
  filteredEvents: Event[] = [];
  title: String = "";

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.params.hasOwnProperty('category')) {
      this.loadEventPerCategory(this.route.snapshot.params['category']);
      this.title = "Explore By Categories";
    } else if (this.route.snapshot.params.hasOwnProperty('city')) {
      this.loadEventPerCity(this.route.snapshot.params['city']);
      this.title = "Explore By Cities";
    } else if (this.router.url === '/events/passed-events') {
      this.title = "Passed Events";
      this.loadPassedEvents();
    } else if (this.router.url === '/events/upcoming-events') {
      this.title = "Upcoming Events";
      this.loadUpcomingEvents();
    } else {
      this.title = "All Events";
      this.loadEvents();
    }
  }

  loadEvents(category: string | null = null): void {
    this.events$ = this.eventService.getAll()
      .pipe(
        catchError((error: HttpResponse<any>) => {
          console.log(error);
          return of([]);
        })
      );
    this.events$.subscribe(events => {
      this.allEvents = events;
      this.filteredEvents = events;
    });
  }

  loadEventPerCategory(categoryId: string): void {
    this.events$ = this.eventService.getByCategoryId(categoryId)
      .pipe(
        catchError((error: HttpResponse<any>) => {
          console.log(error);
          return of([]);
        })
      );
    this.events$.subscribe(events => {
      this.allEvents = events;
      this.filteredEvents = events;
    });
  }

  loadEventPerCity(city: string): void {
    this.events$ = this.eventService.getEventsByCity(city)
      .pipe(
        catchError((error: HttpResponse<any>) => {
          console.log(error);
          return of([]);
        })
      );
    this.events$.subscribe(events => {
      this.allEvents = events;
      this.filteredEvents = events;
    });
  }

  loadPassedEvents() {
    this.events$ = this.eventService.getPassedEvents()
      .pipe(
        catchError((error: HttpResponse<any>) => {
          console.log(error);
          return of([]);
        })
      );
    this.events$.subscribe(events => {
      this.allEvents = events;
      this.filteredEvents = events;
    });
  }

  loadUpcomingEvents() {
    this.events$ = this.eventService.getUpcomingEvents()
      .pipe(
        catchError((error: HttpResponse<any>) => {
          console.log(error);
          return of([]);
        })
      );
    this.events$.subscribe(events => {
      this.allEvents = events;
      this.filteredEvents = events;
    });
  }

  onFiltersApplied(filters: { category: string | null, city: string | null, date: Date | null }) {
    console.log('Filters received in event list:', filters);
    this.filteredEvents = this.allEvents.filter(event => {
      const matchesCategory = !filters.category || event.category.name === filters.category;
      const matchesCity = !filters.city || event.city === filters.city;
      const matchesDate = !filters.date || new Date(event.date).toDateString() === filters.date.toDateString();
      return matchesCategory && matchesCity && matchesDate;
    });
  }
}

