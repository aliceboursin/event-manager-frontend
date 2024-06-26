import { Component, OnInit } from "@angular/core";
import { Event } from "../../data/event";
import { EventService } from "../../services/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, map, Observable, of} from "rxjs";
import {HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-event-list',
    templateUrl:'./event-list.component.html',
    styleUrls: ['./event-list.component.css']
})

export class EventListComponent implements OnInit {
    events$: Observable<Event[]> | null = null;
    cities$: Observable<string[]> | null = null;

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
      } else if (this.router.url === '/events/passed-events') {
        console.log("passed events");
        this.loadPassedEvents();
      } else if (this.router.url === '/events/upcoming-events') {
        console.log("upcoming events");
        this.loadUpcomingEvents();
      } if (this.route.snapshot.params.hasOwnProperty('city')) {
        console.log("by city");
        this.loadEventsByCity(this.route.snapshot.params['city']);
      } else {
        this.loadEvents();
      }
      if (this.events$) {
        this.cities$ = this.getAllCities();
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

    loadEventsByCity(city: string) {
      this.events$ = this.getEventsByCity(city);
    }

  goToPassedEvents() {
    this.router.navigate(['events/passed-events']);
  }

  goToUpcomingEvents() {
    this.router.navigate(['events/upcoming-events']);
  }

  getAllCities(): Observable<string[]> | null {
    if (!this.events$) return null;

    return this.events$.pipe(
      map((events: Event[]) => {
        const cities = events.map(event => event.city);
        return Array.from(new Set(cities));
      })
    );
  }

  getEventsByCity(city: string): Observable<Event[]> | null {
    if (!this.events$) return null;

    return this.events$.pipe(
      map((events: Event[]) => events.filter(event => event.city === city))
    );
  }

}
