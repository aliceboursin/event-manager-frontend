import { Component, OnInit } from "@angular/core";
import { Event } from "../../data/event";
import { EventService } from "../../services/event.service";
import {ActivatedRoute} from "@angular/router";
import {catchError, Observable, of} from "rxjs";
import {HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-event-list',
    templateUrl:'./event-list.component.html',
    styleUrls: ['./event-list.component.css']
})

export class EventListComponent implements OnInit {
    events$: Observable<Event[]> | null = null;

    constructor(
      private eventService: EventService,
      private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
      // event list but with parameters. We give the category id to the route to get the events by category id
      if (this.route.snapshot.params.hasOwnProperty('category')) {
        console.log(this.route.snapshot.params['category']);
        this.loadEventPerCategory(this.route.snapshot.params['category']);
      } else {
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

}
