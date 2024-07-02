import { Component, OnInit } from "@angular/core";
import { Event } from "../../data/event";
import { EventService } from "../../services/event.service";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, Observable, of } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { UserService } from "../../services/user.service";
import { SessionStorageService } from "../../services/session.storage.service";

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
  friendEventIds: Set<string> = new Set();
  showFriendEvents: boolean = false;
  userId : string | null = "";

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private userService : UserService,
    private sesssionStorageService : SessionStorageService,
  ) {}


  ngOnInit(): void {
    this.userId = this.sesssionStorageService.getItem('userId');
    if(this.userId){
      this.userService.getFriendsParticipationEventId(this.userId).subscribe(ids => {
      this.friendEventIds = new Set(ids);
      this.loadInitialEvents();
    });
    }
    else{
      this.loadInitialEvents();
    }

  }

  loadInitialEvents() {
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
    } else if (this.router.url === '/events/my-events/upcoming-events') {
      this.title = "My Upcoming Events";
      this.loadMyUpcomingEvent();
    } else if (this.router.url === '/events/my-events/past-events') {
      this.title = "My Past Events";
      this.loadMyPastEvent();
    } else if (this.router.url === '/events/my-events/created-events') {
      this.title = "Events I created";
      this.loadMyCreatedEvent();
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

  loadMyUpcomingEvent(){
    if(this.userId){
      this.events$ = this.eventService.getAllMyUpcomingEvent(this.userId)
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

  }

  loadMyPastEvent(){
    if(this.userId){
      this.events$ = this.eventService.getAllMyPastEvent(this.userId)
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

  }

  loadMyCreatedEvent(){
    if(this.userId){
      this.events$ = this.eventService.getAllMyOwnedEvent(this.userId)
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

  }


  onFiltersApplied(filters: { category: string | null, city: string | null, date: Date | null, showFriendEvents: boolean }) {
    console.log('Filters received in event list:', filters);
    this.showFriendEvents = filters.showFriendEvents;
    this.applyFilters(filters);
  }

  applyFilters(filters?: { category: string | null, city: string | null, date: Date | null }) {
    const { category, city, date } = filters || {};
    this.filteredEvents = this.allEvents.filter(event => {
      const matchesCategory = !category || event.category.name === category;
      const matchesCity = !city || event.city === city;
      const matchesDate = !date || new Date(event.date).toDateString() === date.toDateString();
      const matchesFriendEvents = !this.showFriendEvents || this.friendEventIds.has(event.id);
      return matchesCategory && matchesCity && matchesDate && matchesFriendEvents;
    });
  }
}

